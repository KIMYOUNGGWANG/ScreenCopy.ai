'use client'

import { useState } from 'react'
import { type User } from '@supabase/supabase-js'
import StudioForm from '@/components/StudioForm'
import PreviewPanel from '@/components/PreviewPanel'
import PreviewPanelSkeleton from '@/components/PreviewPanelSkeleton'
import { EmptyPreviewPanel } from '@/components/EmptyPreviewPanel'

interface StudioClientPageProps {
  user: User
  profile: { credits: number } | null
}

export type GenerationResult = {
  headline: string
  subtext: string
  style: string
  reasoning: string
  psychologicalTrigger: string
  targetMatch: number
  estimatedImpact: string
}

export default function StudioClientPage({ user, profile }: StudioClientPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCopy, setGeneratedCopy] = useState<GenerationResult[] | null>(null)
  const [uploadedScreenshotUrl, setUploadedScreenshotUrl] = useState<string | null>(null)
  const [generationId, setGenerationId] = useState<string | null>(null) // New state for generationId

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <StudioForm
            credits={profile?.credits ?? 0}
            setIsLoading={setIsLoading}
            setGeneratedCopy={setGeneratedCopy}
            setUploadedScreenshotUrl={setUploadedScreenshotUrl}
            setGenerationId={setGenerationId} // Pass setGenerationId
          />
        </div>
        <div>
          {isLoading ? (
            <PreviewPanelSkeleton />
          ) : generatedCopy ? (
            <PreviewPanel
              results={generatedCopy}
              screenshotUrl={uploadedScreenshotUrl}
              generationId={generationId} // Pass generationId to PreviewPanel
            />
          ) : (
            <EmptyPreviewPanel />
          )}
        </div>
      </div>
    </div>
  )
}