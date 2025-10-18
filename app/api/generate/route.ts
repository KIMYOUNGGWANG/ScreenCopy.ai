import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { z } from 'zod';
import { supaServer } from "@/lib/supa";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Upstash Redis and Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
  analytics: true,
});

// Zod schema for validating the new, detailed request body
const GenerateRequestSchema = z.object({
  screenshotUrl: z.string().url(),
  appName: z.string().min(1),
  appCategory: z.string().min(1),
  targetAudience: z.object({
    age: z.string(),
    occupation: z.string(),
    painPoint: z.string(),
  }),
  screenFeature: z.string().min(1),
  tonePreference: z.string().min(1),
  keyBenefit: z.string().min(1),
  competitors: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const supabase = await supaServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Rate limit user
    const { success } = await ratelimit.limit(user.id);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 3. Check credits
    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
    if (!profile || profile.credits < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
    }

    // 4. Validate request body
    const body = await req.json();
    const input = GenerateRequestSchema.parse(body);

    // 5. Construct the enhanced prompt
    const competitorsArray = input.competitors ? input.competitors.split(',').map(c => c.trim()) : [];
    const enhancedPrompt = `You are an expert App Store marketer who has helped apps achieve 50%+ conversion rate increases.

CONTEXT:
- App Name: ${input.appName}
- Category: ${input.appCategory}
- Target Audience: ${input.targetAudience.occupation}, ages ${input.targetAudience.age}
- Their Pain Point: ${input.targetAudience.painPoint}
- This Screenshot Shows: ${input.screenFeature}
- Key Benefit: ${input.keyBenefit}
- Tone: ${input.tonePreference}
${competitorsArray.length > 0 ? `- Competitors: ${competitorsArray.join(', ')}` : ''}

TASK:
Analyze this screenshot and create 5 compelling marketing headlines.

REQUIREMENTS:
1. Each headline must be 6-10 words maximum
2. Use power words that trigger emotion (discover, transform, unleash, effortless)
3. Focus on the BENEFIT, not the feature
4. Make it specific to what's shown in the screenshot
5. Use the target audience's language (${input.targetAudience.occupation} talk differently than others)
6. If competitors exist, ensure headlines differentiate from them
7. Test different psychological triggers:
   - Headline 1: Fear of missing out (FOMO)
   - Headline 2: Social proof
   - Headline 3: Simplicity/ease
   - Headline 4: Transformation/results
   - Headline 5: Exclusivity/status

FORMAT:
Return ONLY a JSON object with a single key "copies" which is an array of objects with this structure:
{
  "copies": [
    {
      "headline": "Your headline here",
      "subtext": "Supporting text (10-15 words)",
      "style": "bold" | "subtle" | "feature" | "benefit" | "emotional",
      "psychologicalTrigger": "FOMO" | "social proof" | "simplicity" | "transformation" | "status",
      "reasoning": "Why this works for ${input.targetAudience.occupation}"
    }
  ]
}

EXAMPLES OF GREAT APP STORE COPY:
- Calm: "Sleep. Meditate. Relax." (Simple, benefit-focused)
- Headspace: "Meditation made simple" (Addresses pain point)
- Duolingo: "Learn a language for free. Forever." (Clear value prop)

Now analyze the screenshot and create headlines that convert.`;

    // 6. Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: enhancedPrompt },
            { type: "image_url", image_url: { url: input.screenshotUrl } }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('OpenAI returned no content.');
    }
    const generatedJson = JSON.parse(content);

    // 7. Decrement credits and save generation
    await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('id', user.id);
    
    const { data: generationData, error: generationError } = await supabase
      .from('generations')
      .insert({
        user_id: user.id,
        screenshot_url: input.screenshotUrl,
        app_description: `App: ${input.appName}, Feature: ${input.screenFeature}`, // Simplified description for DB
        target_audience: JSON.stringify(input.targetAudience),
        generated_copies: generatedJson.copies, // The AI is asked to return a { copies: [...] } object
        credits_used: 1,
      })
      .select('id')
      .single();

    if (generationError) {
      throw new Error(`Failed to save generation: ${generationError.message}`);
    }

    return NextResponse.json({ ...generatedJson, generationId: generationData.id });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body', details: error.errors }, { status: 400 });
    }
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Failed to generate copies' }, { status: 500 });
  }
}
