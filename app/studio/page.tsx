"use client"

import { useState } from "react"
import { StudioForm, type FormData } from "@/components/StudioForm"
import { PreviewPanel } from "@/components/PreviewPanel"

interface Slide {
  id: number
  title: string
  subtitle: string
  callout: string
}

export default function StudioPage() {
  const [generatedSlides, setGeneratedSlides] = useState<Slide[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (formData: FormData) => {
    setIsGenerating(true)

    // Mock API call to /api/generate
    // In production, this would be:
    // const response = await fetch('/api/generate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    // const data = await response.json()
    // setGeneratedSlides(data.slides)

    // Simulate API delay
    setTimeout(() => {
      // Mock generated slides based on slide count
      const slideCount = Number.parseInt(formData.slideCount)
      const mockSlides: Slide[] = Array.from({ length: slideCount }, (_, i) => ({
        id: i + 1,
        title: `Generated Slide ${i + 1}`,
        subtitle: `This is a ${formData.tone} subtitle for ${formData.goal}`,
        callout: `Feature ${i + 1}`,
      }))

      setGeneratedSlides(mockSlides)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Studio</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Generate compelling App Store screenshot copy in seconds. Fill out the form to create conversion-optimized
            titles, subtitles, and callouts.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Form */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border/50 bg-card p-6">
              <h2 className="text-xl font-semibold mb-6">Generate Copy</h2>
              <StudioForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            <PreviewPanel slides={generatedSlides} isGenerating={isGenerating} />
          </div>
        </div>
      </div>
    </div>
  )
}
