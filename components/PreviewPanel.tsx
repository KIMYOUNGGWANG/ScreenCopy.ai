"use client"

import { useState, useEffect } from "react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Slide } from "@/app/studio/studio-client-page";

interface PreviewPanelProps {
  slides: Slide[] | null
  isGenerating: boolean
  screenshotUrl: string | null
  generationId: string | null
}

export function PreviewPanel({ slides, isGenerating, screenshotUrl, generationId }: PreviewPanelProps) {
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [ratedSlides, setRatedSlides] = useState<Record<number, number>>({});

  const generatePreview = async (headline: string, subtext: string) => {
    if (!screenshotUrl) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = screenshotUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      const x = canvas.width / 2;
      const y = 150;
      ctx.strokeText(headline, x, y);
      ctx.fillText(headline, x, y);
      ctx.font = '48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
      const ySub = y + 80;
      ctx.strokeText(subtext, x, ySub);
      ctx.fillText(subtext, x, ySub);
      setPreviewImageUrl(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      console.error("Failed to load image for canvas preview.");
    }
  };

  useEffect(() => {
    if (slides && slides.length > 0) {
      const firstSlideId = String(slides[0].id);
      setActiveSlideId(firstSlideId);
      handleTabChange(firstSlideId);
      setRatedSlides({}); // Reset ratings for new generation
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);

  const handleTabChange = (slideId: string) => {
    const slide = slides?.find(s => String(s.id) === slideId);
    if (slide) {
      setActiveSlideId(slideId);
      generatePreview(slide.headline, slide.subtext);
    }
  }

  const handleFeedback = async (slideId: number, rating: number) => {
    if (!generationId || ratedSlides[slideId]) return;
    setRatedSlides(prev => ({ ...prev, [slideId]: rating }));
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        generationId,
        copyIndex: slideId - 1,
        rating 
      }),
    });
  };

  const handleCopy = (text: string) => { navigator.clipboard.writeText(text); };

  if (isGenerating) {
    return (
      <div className="flex h-full min-h-[600px] items-center justify-center rounded-lg border border-dashed bg-muted/20">
        <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent" role="status">
            <span className="sr-only">Generating...</span>
          </div>
          <p className="text-muted-foreground">Analyzing screenshot and generating copy...</p>
        </div>
      </div>
    )
  }
  
  if (!slides || slides.length === 0) {
    return (
      <div className="flex h-full min-h-[600px] items-center justify-center rounded-lg border border-dashed bg-muted/20">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-lg">Your generated slides will appear here.</p>
          <p className="text-sm text-muted-foreground">Fill out the form to start.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {screenshotUrl && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Live Preview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Original</h3>
              <div className="aspect-[9/16] w-full relative overflow-hidden rounded-lg border">
                <NextImage src={screenshotUrl} alt="Original screenshot" fill className="object-contain" unoptimized />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">With Copy Applied</h3>
              {previewImageUrl ? (
                <div className="aspect-[9/16] w-full relative overflow-hidden rounded-lg border">
                  <NextImage src={previewImageUrl} alt="Screenshot with generated copy" fill className="object-contain" unoptimized />
                </div>
              ) : (
                <div className="aspect-[9/16] flex items-center justify-center rounded-lg border border-dashed bg-muted/20">
                  <p className="text-sm text-muted-foreground">Select a headline to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Analysis & Results</h2>
        <Tabs value={activeSlideId ?? undefined} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">{slides.map(s => <TabsTrigger key={s.id} value={String(s.id)}>Headline {s.id}</TabsTrigger>)}</TabsList>
          {slides.map((slide) => (
            <TabsContent key={slide.id} value={String(slide.id)} className="mt-6">
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{slide.headline}</h3>
                    <p className="text-lg text-muted-foreground">{slide.subtext}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(slide.headline)}><Copy className="mr-2 h-4 w-4" /> Copy Headline</Button>
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="font-semibold mb-3 text-accent">Why This Works</h4>
                    <p className="text-sm text-accent-foreground/80 mb-4">{slide.reasoning}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">{slide.psychologicalTrigger}</Badge>
                      <Badge variant="secondary">{slide.style}</Badge>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Was this helpful?</p>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant={ratedSlides[slide.id] === 5 ? "default" : "outline"}
                          onClick={() => handleFeedback(slide.id, 5)}
                          disabled={!!ratedSlides[slide.id]}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant={ratedSlides[slide.id] === 1 ? "destructive" : "outline"}
                          onClick={() => handleFeedback(slide.id, 1)}
                          disabled={!!ratedSlides[slide.id]}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}