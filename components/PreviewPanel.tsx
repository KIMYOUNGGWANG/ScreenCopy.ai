"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileJson, FileSpreadsheet } from "lucide-react"
import { sampleSlides } from "@/lib/mock"

interface Slide {
  id: number
  title: string
  subtitle: string
  callout: string
}

interface PreviewPanelProps {
  slides: Slide[] | null
  isGenerating: boolean
}

export function PreviewPanel({ slides, isGenerating }: PreviewPanelProps) {
  const [activeVariant, setActiveVariant] = useState<"variantA" | "variantB" | "variantC">("variantA")

  // Use provided slides or sample slides based on variant
  const displaySlides = slides || sampleSlides[activeVariant]

  const handleExportCSV = () => {
    // Mock CSV export
    // In production: convert slides to CSV format and trigger download
    console.log("[v0] Exporting to CSV:", displaySlides)
    alert("CSV export would trigger here")
  }

  const handleExportJSON = () => {
    // Mock JSON export
    // In production: convert slides to JSON and trigger download
    console.log("[v0] Exporting to JSON:", displaySlides)
    alert("JSON export would trigger here")
  }

  if (!slides && !isGenerating) {
    return (
      <div className="flex h-full min-h-[500px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/20">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-lg">Your generated slides will appear here.</p>
          <p className="text-sm text-muted-foreground">Fill out the form and click Generate Copy to start.</p>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="flex h-full min-h-[500px] items-center justify-center rounded-lg border border-border/50 bg-muted/20">
        <div className="text-center space-y-4">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent"
            role="status"
          >
            <span className="sr-only">Generating slides...</span>
          </div>
          <p className="text-muted-foreground">Generating your slides...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Variant Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Variant:</span>
          <div className="flex gap-1" role="group" aria-label="Slide variants">
            <Button
              variant={activeVariant === "variantA" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveVariant("variantA")}
              aria-pressed={activeVariant === "variantA"}
            >
              A
            </Button>
            <Button
              variant={activeVariant === "variantB" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveVariant("variantB")}
              aria-pressed={activeVariant === "variantB"}
            >
              B
            </Button>
            <Button
              variant={activeVariant === "variantC" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveVariant("variantC")}
              aria-pressed={activeVariant === "variantC"}
            >
              C
            </Button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <FileSpreadsheet className="mr-2 h-4 w-4" aria-hidden="true" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            <FileJson className="mr-2 h-4 w-4" aria-hidden="true" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Slides Tabs */}
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto" aria-label="Slide navigation">
          {displaySlides.map((slide) => (
            <TabsTrigger key={slide.id} value={String(slide.id)}>
              Slide {slide.id}
            </TabsTrigger>
          ))}
        </TabsList>

        {displaySlides.map((slide) => (
          <TabsContent key={slide.id} value={String(slide.id)} className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-8 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Title</label>
                  <p className="text-2xl font-bold text-balance">{slide.title}</p>
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Subtitle</label>
                  <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{slide.subtitle}</p>
                </div>

                {/* Callout */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Callout</label>
                  <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                    {slide.callout}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
