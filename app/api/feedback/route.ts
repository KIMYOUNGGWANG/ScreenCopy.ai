import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { supaServer } from "@/lib/supa";

const FeedbackRequestSchema = z.object({
  generationId: z.string().uuid(),
  copyIndex: z.number().min(0),
  rating: z.number(), // e.g., 5 for like, 1 for dislike
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const supabase = await supaServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate request body
    const body = await req.json();
    const input = FeedbackRequestSchema.parse(body);

    // 3. Insert feedback into the database
    const { error } = await supabase.from('copy_feedback').insert({
      generation_id: input.generationId,
      user_id: user.id,
      copy_index: input.copyIndex,
      user_rating: input.rating,
    });

    if (error) {
      console.error("Failed to save feedback:", error);
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body', details: error.errors }, { status: 400 });
    }
    console.error('Feedback error:', error);
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
  }
}
