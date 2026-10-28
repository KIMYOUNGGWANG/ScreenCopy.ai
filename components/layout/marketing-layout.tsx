import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MainNav } from '@/components/main-nav'
import { UserAccountNav } from '@/components/user-account-nav'
import { buttonVariants } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} profile={profile} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
