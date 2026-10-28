import { createClient } from '@/lib/supabase/server'
import PricingTable from '@/components/PricingTable'

export const metadata = {
  title: '가격',
  description: 'ScreenCopy.ai 크레딧 패키지를 확인하고 구매하세요.',
}

export default async function PricingPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center mb-4">가격 플랜</h1>
      <p className="text-lg text-muted-foreground text-center mb-12">
        필요한 만큼만 크레딧을 구매하세요. 만료 기한은 없습니다.
      </p>
      <PricingTable currentCredits={profile?.credits || 0} />
    </div>
  )
}