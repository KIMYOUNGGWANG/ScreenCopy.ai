import { createClient } from '@/lib/supabase/server'
import { type User } from '@supabase/supabase-js'
import { MainNav } from '@/components/main-nav'
import { UserAccountNav } from '@/components/user-account-nav'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface SiteHeaderProps {
  user: User | null
  profile: { credits: number } | null
}

export async function SiteHeader() {
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
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user ? (
              <UserAccountNav user={user} profile={profile} />
            ) : (
              <Link
                href="/auth/signin"
                className={buttonVariants({ variant: 'ghost' })}
              >
                로그인
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
