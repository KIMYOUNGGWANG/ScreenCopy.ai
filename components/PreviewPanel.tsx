'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type GenerationResult } from '@/app/studio/studio-client-page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'

interface PreviewPanelProps {
  results: GenerationResult[]
  screenshotUrl: string | null
  generationId: string | null // New prop
}

export default function PreviewPanel({ results, screenshotUrl, generationId }: PreviewPanelProps) {
  const supabase = createClient()
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [ratedSlides, setRatedSlides] = useState<Record<number, number>>({})

  const generatePreview = async (headline: string, subtext: string) => {
    if (!screenshotUrl) return
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = screenshotUrl
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      ctx.font =
        'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 4
      ctx.textAlign = 'center'
      const x = canvas.width / 2
      const y = 150
      ctx.strokeText(headline, x, y)
      ctx.fillText(headline, x, y)
      ctx.font =
        '48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      const ySub = y + 80
      ctx.strokeText(subtext, x, ySub)
      ctx.fillText(subtext, x, ySub)
      setPreviewImageUrl(canvas.toDataURL('image/png'))
    }
    img.onerror = () => {
      console.error('Failed to load image for canvas preview.')
    }
  }

  useEffect(() => {
    if (results && results.length > 0) {
      const firstSlideId = String(0) // Assuming results array index as ID
      setActiveSlideId(firstSlideId)
      handleTabChange(firstSlideId)
      setRatedSlides({}) // Reset ratings for new generation
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  const handleTabChange = (slideId: string) => {
    const slideIndex = parseInt(slideId)
    const slide = results?.[slideIndex]
    if (slide) {
      setActiveSlideId(slideId)
      generatePreview(slide.headline, slide.subtext)
    }
  }

  const handleFeedback = async (copyIndex: number, rating: number) => {
    if (!generationId) {
      toast.error('피드백을 전송할 수 없습니다.', {
        description: '생성 ID를 찾을 수 없습니다.',
      })
      return
    }
    if (ratedSlides[copyIndex]) {
      toast.info('이미 피드백을 주셨습니다.', {
        description: '하나의 카피에는 한 번만 피드백을 줄 수 있습니다.',
      })
      return
    }

    setRatedSlides((prev) => ({ ...prev, [copyIndex]: rating }))

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ generationId, copyIndex, rating }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '피드백 전송에 실패했습니다.')
      }

      toast.success('피드백이 전송되었습니다!', {
        description: `카피 ${copyIndex + 1}에 ${rating === 5 ? '긍정' : '부정'} 피드백을 주셨습니다.`,
      })
    } catch (error: any) {
      toast.error('피드백 전송 오류', {
        description: error.message,
      })
      // Optionally revert ratedSlides state if feedback submission fails
      setRatedSlides((prev) => {
        const newState = { ...prev }
        delete newState[copyIndex]
        return newState
      })
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('클립보드에 복사되었습니다!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI 생성 결과</h2>
      {screenshotUrl && (
        <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border">
          <Image
            src={screenshotUrl}
            alt="Uploaded screenshot"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="space-y-4">
        <Tabs value={activeSlideId ?? undefined} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {results.map((_, index) => (
              <TabsTrigger key={index} value={String(index)}>
                카피 {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {results.map((result, index) => (
            <TabsContent key={index} value={String(index)} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="text-lg">{result.headline}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(`${result.headline}\n${result.subtext}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{result.subtext}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">스타일: {result.style}</Badge>
                    <Badge variant="secondary">트리거: {result.psychologicalTrigger}</Badge>
                    <Badge variant="outline">예상 영향: {result.estimatedImpact}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">이 카피가 효과적인 이유:</h4>
                    <p className="text-sm text-muted-foreground">{result.reasoning}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={ratedSlides[index] === 5 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(index, 5)}
                      disabled={!!ratedSlides[index]}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      유용해요
                    </Button>
                    <Button
                      variant={ratedSlides[index] === 1 ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => handleFeedback(index, 1)}
                      disabled={!!ratedSlides[index]}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      개선 필요
                    </Button>
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