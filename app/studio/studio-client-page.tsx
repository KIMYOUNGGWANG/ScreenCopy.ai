"use client";

import { useState, useEffect } from "react";
import { PreviewPanel } from "@/components/PreviewPanel";
import { WizardForm, type GenerateRequest } from "@/components/WizardForm";
import { uploadScreenshot } from "@/lib/upload";
import { supaBrowser } from "@/lib/supa-browser";

// Updated Slide interface to match the new API response
export interface Slide {
  id: number;
  headline: string;
  subtext: string;
  style: string;
  psychologicalTrigger: string;
  reasoning: string;
}

export default function StudioClientPage() {
  const [generatedSlides, setGeneratedSlides] = useState<Slide[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [err, setErr] = useState("");
  const [screenshotObjectUrl, setScreenshotObjectUrl] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);

  const handleGenerate = async (formData: GenerateRequest) => {
    if (!formData.screenshotFile) {
      setErr("Screenshot file is missing.");
      return;
    }

    // Create a temporary local URL for the image for instant preview
    const objectUrl = URL.createObjectURL(formData.screenshotFile);
    setScreenshotObjectUrl(objectUrl);

    try {
      setIsGenerating(true);
      setErr("");
      setGenerationId(null); // Reset generation ID on new request

      const supabase = supaBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated.");

      const screenshotUrl = await uploadScreenshot(formData.screenshotFile, user.id);
      if (!screenshotUrl) throw new Error("Failed to upload screenshot.");

      const payload = { ...formData, screenshotUrl, competitors: formData.competitors || "" };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 402) {
        setErr("Not enough credits. Please upgrade on the Pricing page.");
        return;
      }
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Generation failed");
      }

      const data = await res.json();
      
      setGenerationId(data.generationId);

      // Updated mapping to match the new API response structure
      const resultSlides: Slide[] = (data.copies || []).map((opt: any, idx: number) => ({
        id: idx + 1,
        headline: opt.headline,
        subtext: opt.subtext,
        style: opt.style,
        psychologicalTrigger: opt.psychologicalTrigger,
        reasoning: opt.reasoning,
      }));

      setGeneratedSlides(resultSlides);
    } catch (e: any) {
      console.error(e);
      setErr(e?.message ?? "Something went wrong while generating.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (screenshotObjectUrl) {
        URL.revokeObjectURL(screenshotObjectUrl);
      }
    };
  }, [screenshotObjectUrl]);

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Studio</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Generate compelling App Store screenshot copy in seconds. Follow the steps to create conversion-optimized titles and subtitles.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Wizard Form */}
          <div className="space-y-6">
            <WizardForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            {err && <p className="text-sm text-destructive mt-4">{err}</p>}
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            <PreviewPanel 
              slides={generatedSlides} 
              isGenerating={isGenerating} 
              screenshotUrl={screenshotObjectUrl}
              generationId={generationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

