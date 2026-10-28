'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type GenerationResult } from '@/app/studio/studio-client-page'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface Generation {
  id: string
  screenshot_url: string
  app_description: string
  generated_copies: GenerationResult[]
  credits_used: number
  created_at: string
}

interface GenerationHistoryProps {
  generations: Generation[]
}

export default function GenerationHistory({ generations }: GenerationHistoryProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('클립보드에 복사되었습니다!')
  }

  if (generations.length === 0) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">생성 히스토리</h2>
        <p className="text-muted-foreground">아직 생성된 카피가 없습니다. 스튜디오에서 첫 카피를 생성해보세요!</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">생성 히스토리</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {generations.map((gen) => (
          <Card key={gen.id}>
            <CardHeader>
              <CardTitle className="text-lg">{gen.app_description}</CardTitle>
              <CardDescription>
                {format(new Date(gen.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border">
                <Image
                  src={gen.screenshot_url}
                  alt="Generated screenshot thumbnail"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="space-y-2">
                {gen.generated_copies.slice(0, 2).map((copy, index) => ( // Show first 2 copies
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <p className="text-sm font-medium">{copy.headline}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(`${copy.headline}\n${copy.subtext}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {gen.generated_copies.length > 2 && (
                  <p className="text-sm text-muted-foreground">외 {gen.generated_copies.length - 2}개의 카피...</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}