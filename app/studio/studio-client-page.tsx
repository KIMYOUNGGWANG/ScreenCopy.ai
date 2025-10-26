"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { uploadScreenshot } from "@/lib/upload";
import { supaBrowser } from "@/lib/supa-browser";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudioStore } from "@/lib/store";
import type { GenerateRequest } from "@/components/WizardForm";
import { WizardFormSkeleton } from "@/components/WizardFormSkeleton";
import { PreviewPanelSkeleton } from "@/components/PreviewPanelSkeleton";
import { EmptyPreviewPanel } from "@/components/EmptyPreviewPanel";

// Dynamically import components
const DynamicPreviewPanel = dynamic(() => import("@/components/PreviewPanel").then((mod) => mod.PreviewPanel), {
  loading: () => <PreviewPanelSkeleton />,
  ssr: false,
});

const DynamicWizardForm = dynamic(() => import("@/components/WizardForm").then((mod) => mod.WizardForm), {
  loading: () => <WizardFormSkeleton />,
  ssr: false,
});

export interface Slide {
  id: number;
  headline: string;
  subtext: string;
  style: string;
  psychologicalTrigger: string;
  reasoning: string;
}

export default function StudioClientPage() {
  const { toast } = useToast();
  const {
    generatedSlides,
    isGenerating,
    startGeneration,
    setGeneratedData,
    setGenerationError,
    resetState,
  } = useStudioStore();

  // Reset store on unmount
  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  const handleGenerate = async (formData: GenerateRequest) => {
    if (!formData.screenshotFile) {
      toast({ title: "Generation Failed", description: "Screenshot file is missing.", variant: "destructive" });
      setGenerationError("Screenshot file is missing.");
      return;
    }

    const generationToastId = toast({
      title: "Generating Copy",
      description: "Please wait while we generate your marketing copy...",
      duration: 999999, // Indefinite duration
    });

    startGeneration(formData.screenshotFile);

    try {
      const supabase = supaBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.dismiss(generationToastId.id);
        toast({ title: "Generation Failed", description: "User not authenticated. Please sign in.", variant: "destructive" });
        throw new Error("User not authenticated.");
      }

      const screenshotUrl = await uploadScreenshot(formData.screenshotFile, user.id);
      if (!screenshotUrl) {
        toast.dismiss(generationToastId.id);
        toast({ title: "Generation Failed", description: "Failed to upload screenshot.", variant: "destructive" });
        throw new Error("Failed to upload screenshot.");
      }

      const payload = { ...formData, screenshotUrl, competitors: formData.competitors || "" };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 402) {
        toast.dismiss(generationToastId.id);
        toast({ title: "Generation Failed", description: "Not enough credits. Please upgrade on the Pricing page.", variant: "destructive" });
        setGenerationError("Not enough credits. Please upgrade on the Pricing page.");
        return;
      }
      if (!res.ok) {
        toast.dismiss(generationToastId.id);
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        let errorMessage = "Generation failed: An unknown error occurred.";
        if (res.status === 429) errorMessage = "Too many requests. Please try again in a minute.";
        if (res.status === 401) errorMessage = "Unauthorized. Please sign in again.";
        if (errorData.error || errorData.message) errorMessage = errorData.error || errorData.message;
        
        toast({ title: "Generation Failed", description: errorMessage, variant: "destructive" });
        throw new Error(errorMessage);
      }

      const data = await res.json();
      
      const resultSlides: Slide[] = (data.copies || []).map((opt: any, idx: number) => ({
        id: idx + 1,
        headline: opt.headline,
        subtext: opt.subtext,
        style: opt.style,
        psychologicalTrigger: opt.psychologicalTrigger,
        reasoning: opt.reasoning,
      }));

      setGeneratedData({ slides: resultSlides, generationId: data.generationId });
      toast.dismiss(generationToastId.id);
      toast({ title: "Generation Successful!", description: "Your marketing copy has been generated.", variant: "success" });
    } catch (e: any) {
      toast.dismiss(generationToastId.id);
      console.error(e);
      setGenerationError(e?.message ?? "Something went wrong while generating.");
      toast({ title: "Generation Failed", description: e?.message ?? "Something went wrong while generating.", variant: "destructive" });
    }
  };

  const handleExport = (format: "csv" | "json") => {
    if (!generatedSlides || generatedSlides.length === 0) {
      toast({ title: "No data to export", description: "Generate some copy first!", variant: "destructive" });
      return;
    }

    let dataStr = "";
    let filename = `generated_copy.${format}`;
    let mimeType = "";

    if (format === "json") {
      dataStr = JSON.stringify(generatedSlides, null, 2);
      mimeType = "application/json";
    } else {
      const headers = ["id", "headline", "subtext", "style", "psychologicalTrigger", "reasoning"];
      const csvRows = generatedSlides.map(slide =>
        headers.map(header => `"${String((slide as any)[header]).replace(/"/g, '""')}"`).join(",")
      );
      dataStr = [headers.join(","), ...csvRows].join("\n");
      mimeType = "text/csv";
    }

    const blob = new Blob([dataStr], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: `Exported to ${format.toUpperCase()}`, description: `Your generated copy has been downloaded as ${filename}.` });
  };

  return (
    <div className="container w-full mx-auto py-12 md:py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Studio</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Generate compelling App Store screenshot copy in seconds. Follow the steps to create conversion-optimized titles and subtitles.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <DynamicWizardForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          <div className="space-y-6">
            {generatedSlides && generatedSlides.length > 0 && (
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => handleExport("csv")} disabled={isGenerating}>
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("json")} disabled={isGenerating}>
                  <Download className="mr-2 h-4 w-4" /> Export JSON
                </Button>
              </div>
            )}
            {generatedSlides && generatedSlides.length > 0 ? (
              <DynamicPreviewPanel />
            ) : (
              <EmptyPreviewPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}