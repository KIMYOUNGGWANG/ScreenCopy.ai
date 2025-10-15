"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface StudioFormProps {
  onGenerate: (data: FormData) => void
  isGenerating: boolean
}

export interface FormData {
  appUrl: string
  persona: string
  tone: string
  goal: string
  slideCount: string
  keywords: string
  language: string
}

export function StudioForm({ onGenerate, isGenerating }: StudioFormProps) {
  const [formData, setFormData] = useState<FormData>({
    appUrl: "",
    persona: "",
    tone: "neutral",
    goal: "downloads",
    slideCount: "5",
    keywords: "",
    language: "en",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.tone) {
      newErrors.tone = "Please select a tone"
    }
    if (!formData.goal) {
      newErrors.goal = "Please select a goal"
    }
    if (!formData.slideCount) {
      newErrors.slideCount = "Please select slide count"
    }
    if (!formData.keywords.trim()) {
      newErrors.keywords = "Please enter at least one keyword"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onGenerate(formData)

    // Mock API call would happen here
    // POST /api/generate with formData
    // Response would contain generated slides
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* App URL */}
      <div className="space-y-2">
        <Label htmlFor="appUrl">
          App URL <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <Input
          id="appUrl"
          type="url"
          placeholder="https://apps.apple.com/..."
          value={formData.appUrl}
          onChange={(e) => updateField("appUrl", e.target.value)}
          aria-describedby={errors.appUrl ? "appUrl-error" : undefined}
        />
        {errors.appUrl && (
          <p id="appUrl-error" className="text-sm text-destructive" role="alert">
            {errors.appUrl}
          </p>
        )}
      </div>

      {/* Persona */}
      <div className="space-y-2">
        <Label htmlFor="persona">
          Target Persona <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <Textarea
          id="persona"
          placeholder="e.g., Busy professionals aged 25-40 who want to stay fit"
          value={formData.persona}
          onChange={(e) => updateField("persona", e.target.value)}
          rows={3}
          aria-describedby={errors.persona ? "persona-error" : undefined}
        />
        {errors.persona && (
          <p id="persona-error" className="text-sm text-destructive" role="alert">
            {errors.persona}
          </p>
        )}
      </div>

      {/* Tone */}
      <div className="space-y-2">
        <Label htmlFor="tone">
          Tone <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.tone} onValueChange={(value) => updateField("tone", value)}>
          <SelectTrigger
            id="tone"
            aria-describedby={errors.tone ? "tone-error" : undefined}
            aria-invalid={!!errors.tone}
          >
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="persuasive">Persuasive</SelectItem>
            <SelectItem value="humorous">Humorous</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
        {errors.tone && (
          <p id="tone-error" className="text-sm text-destructive" role="alert">
            {errors.tone}
          </p>
        )}
      </div>

      {/* Goal */}
      <div className="space-y-2">
        <Label htmlFor="goal">
          Primary Goal <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.goal} onValueChange={(value) => updateField("goal", value)}>
          <SelectTrigger
            id="goal"
            aria-describedby={errors.goal ? "goal-error" : undefined}
            aria-invalid={!!errors.goal}
          >
            <SelectValue placeholder="Select goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="downloads">Downloads</SelectItem>
            <SelectItem value="conversion">Conversion</SelectItem>
            <SelectItem value="retention">Retention</SelectItem>
          </SelectContent>
        </Select>
        {errors.goal && (
          <p id="goal-error" className="text-sm text-destructive" role="alert">
            {errors.goal}
          </p>
        )}
      </div>

      {/* Slide Count */}
      <div className="space-y-2">
        <Label htmlFor="slideCount">
          Number of Slides <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.slideCount} onValueChange={(value) => updateField("slideCount", value)}>
          <SelectTrigger
            id="slideCount"
            aria-describedby={errors.slideCount ? "slideCount-error" : undefined}
            aria-invalid={!!errors.slideCount}
          >
            <SelectValue placeholder="Select count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 slides</SelectItem>
            <SelectItem value="5">5 slides</SelectItem>
            <SelectItem value="7">7 slides</SelectItem>
          </SelectContent>
        </Select>
        {errors.slideCount && (
          <p id="slideCount-error" className="text-sm text-destructive" role="alert">
            {errors.slideCount}
          </p>
        )}
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="keywords">
          Keywords <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="keywords"
          placeholder="fitness, workout, health, tracking (comma-separated)"
          value={formData.keywords}
          onChange={(e) => updateField("keywords", e.target.value)}
          rows={3}
          aria-describedby={errors.keywords ? "keywords-error" : "keywords-help"}
        />
        <p id="keywords-help" className="text-sm text-muted-foreground">
          Enter keywords separated by commas
        </p>
        {errors.keywords && (
          <p id="keywords-error" className="text-sm text-destructive" role="alert">
            {errors.keywords}
          </p>
        )}
      </div>

      {/* Language (fixed) */}
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Input
          id="language"
          value="English"
          disabled
          className="bg-muted cursor-not-allowed"
          aria-describedby="language-help"
        />
        <p id="language-help" className="text-sm text-muted-foreground">
          Currently fixed to English
        </p>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Generating...
          </>
        ) : (
          "Generate Copy"
        )}
      </Button>
    </form>
  )
}
