"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic
// import { PreviewPanel } from "@/components/PreviewPanel"; // Remove direct import
// import { WizardForm, type GenerateRequest } from "@/components/WizardForm"; // Remove direct import
import { uploadScreenshot } from "@/lib/upload";
import { supaBrowser } from "@/lib/supa-browser";
import { Loader2 } from "lucide-react"; // For loading state

// Dynamically import PreviewPanel
const DynamicPreviewPanel = dynamic(() => import("@/components/PreviewPanel").then((mod) => mod.PreviewPanel), {
  loading: () => (
    <div className="flex h-full min-h-[600px] items-center justify-center rounded-lg border border-dashed bg-muted/20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
  ssr: false, // Ensure it's client-side rendered
});

// Dynamically import WizardForm
const DynamicWizardForm = dynamic(() => import("@/components/WizardForm").then((mod) => mod.WizardForm), {
  loading: () => (
    <div className="flex h-[600px] items-center justify-center rounded-lg border border-dashed bg-muted/20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
  ssr: false, // Ensure it's client-side rendered
});

// Updated Slide interface to match the new API response
export interface Slide {
  id: number;
  headline: string;
  subtext: string;
  style: string;
  psychologicalTrigger: string;
  reasoning: string;
}

// Re-export GenerateRequest type for use in handleGenerate
export type { GenerateRequest } from "@/components/WizardForm";

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
            <DynamicWizardForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
              description="Generate compelling App Store screenshot copy in seconds. Follow the steps to create conversion-optimized titles and subtitles."
            />
            {err && <p className="text-sm text-destructive mt-4">{err}</p>}
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            {generatedSlides && generatedSlides.length > 0 && (
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("csv")}
                  disabled={isGenerating}
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("json")}
                  disabled={isGenerating}
                >
                  <Download className="mr-2 h-4 w-4" /> Export JSON
                </Button>
              </div>
            )}
            <DynamicPreviewPanel 
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

