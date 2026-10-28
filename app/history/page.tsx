import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import GenerationHistory from '@/components/GenerationHistory'

export const metadata = {
  title: '생성 히스토리',
  description: '과거에 생성했던 마케팅 카피들을 확인하세요.',
}

export default async function HistoryPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  const { data: generations, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching generations:', error)
    // Handle error gracefully, maybe show an error message to the user
    return <div>생성 히스토리를 불러오는 데 실패했습니다.</div>
  }

  return <GenerationHistory generations={generations || []} />
}
