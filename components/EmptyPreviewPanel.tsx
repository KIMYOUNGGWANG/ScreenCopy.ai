import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export function EmptyPreviewPanel() {
  return (
    <Card className="flex h-full items-center justify-center">
      <CardContent className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">결과를 기다리는 중</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          왼쪽 폼을 작성하고 생성하기 버튼을 누르면 AI가 생성한 카피가 여기에 표시됩니다.
        </p>
      </CardContent>
    </Card>
  )
}
