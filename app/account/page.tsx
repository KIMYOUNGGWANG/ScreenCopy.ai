import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: '계정',
  description: 'ScreenCopy.ai 계정 정보를 관리하세요.',
}

export default async function AccountPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('credits, created_at')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return <div>계정 정보를 불러오는 데 실패했습니다.</div>
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">계정 설정</h1>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>내 프로필</CardTitle>
          <CardDescription>계정 정보를 확인하고 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">이메일</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">남은 크레딧</p>
            <p className="text-lg">{profile?.credits}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">가입일</p>
            <p className="text-lg">{new Date(profile?.created_at || '').toLocaleDateString('ko-KR')}</p>
          </div>
          <div className="flex justify-end">
            <Button asChild variant="outline">
              <Link href="/pricing">크레딧 충전</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}