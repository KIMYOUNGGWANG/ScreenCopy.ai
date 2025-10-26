"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

interface StudioFormProps {
  onGenerate: (data: FormData) => void
  isGenerating: boolean
}

export interface FormData {
  appDescription: string
  targetAudience: string
  hypothesisTags: {
    socialProof: boolean
    stability: boolean
    price: boolean
    speed: boolean
  }
}

export function StudioForm({ onGenerate, isGenerating }: StudioFormProps) {
  const [formData, setFormData] = useState<FormData>({
    appDescription: "",
    targetAudience: "",
    hypothesisTags: {
      socialProof: false,
      stability: false,
      price: false,
      speed: false,
    },
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.appDescription.trim()) {
      newErrors.appDescription = "Please provide an app description."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onGenerate(formData)
  }

  const updateField = (field: keyof Omit<FormData, 'hypothesisTags'>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const updateTag = (tag: keyof FormData['hypothesisTags'], value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      hypothesisTags: {
        ...prev.hypothesisTags,
        [tag]: value,
      },
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* App Description */}
      <div className="space-y-2">
        <Label htmlFor="appDescription">
          App Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="appDescription"
          placeholder="Describe your app's main purpose and features."
          value={formData.appDescription}
          onChange={(e) => updateField("appDescription", e.target.value)}
          rows={4}
          aria-describedby={errors.appDescription ? "appDescription-error" : undefined}
        />
        {errors.appDescription && (
          <p id="appDescription-error" className="text-sm text-destructive" role="alert">
            {errors.appDescription}
          </p>
        )}
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <Label htmlFor="targetAudience">
          Target Audience <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <Input
          id="targetAudience"
          type="text"
          placeholder="e.g., Busy professionals, students, fitness enthusiasts"
          value={formData.targetAudience}
          onChange={(e) => updateField("targetAudience", e.target.value)}
        />
      </div>

      {/* Hypothesis Tags */}
      <div className="space-y-2">
        <Label>Hypothesis Tags <span className="text-muted-foreground text-sm">(optional)</span></Label>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="socialProof"
              checked={formData.hypothesisTags.socialProof}
              onCheckedChange={(checked) => updateTag("socialProof", checked as boolean)}
            />
            <Label htmlFor="socialProof" className="font-normal">Social Proof</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="stability"
              checked={formData.hypothesisTags.stability}
              onCheckedChange={(checked) => updateTag("stability", checked as boolean)}
            />
            <Label htmlFor="stability" className="font-normal">Stability</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="price"
              checked={formData.hypothesisTags.price}
              onCheckedChange={(checked) => updateTag("price", checked as boolean)}
            />
            <Label htmlFor="price" className="font-normal">Price</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="speed"
              checked={formData.hypothesisTags.speed}
              onCheckedChange={(checked) => updateTag("speed", checked as boolean)}
            />
            <Label htmlFor="speed" className="font-normal">Speed</Label>
          </div>
        </div>
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
