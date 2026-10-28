import type { Metadata } from "next";
import StudioClientPage from "./studio-client-page";

export const metadata: Metadata = {
  title: "Studio | Screenshot Copy Generator",
  description: "Upload a screenshot, describe your app, and generate compelling marketing copy in seconds.",
};

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StudioClientPage from './studio-client-page'

export const metadata = {
  title: '스튜디오',
  description: '앱 스크린샷을 위한 마케팅 카피를 생성하세요.',
}

export default async function StudioPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', user.id)
    .single()

  return <StudioClientPage user={user} profile={profile} />
}