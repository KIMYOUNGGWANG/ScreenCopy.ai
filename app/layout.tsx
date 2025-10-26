import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LazyClientComponents } from "@/components/LazyClientComponents"
import { Suspense } from "react"
import "./globals.css"
import { cookies } from "next/headers"
import { createSupaServerClient } from "@/lib/supa"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "SnapScribe - AI-Powered Content Creation",
  description: "SnapScribe와 함께 스크린샷을 몇 초 만에 매력적인 마케팅 문구로 바꿔보세요. 당신의 AI 기반 콘텐츠 제작 도우미입니다.",
  generator: "vpost.app",
  viewport: "width=device-width, initial-scale=1",
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supa = createSupaServerClient()
  const {
    data: { user },
  } = await supa.auth.getUser()

  let credits: number | null = null
  if (user) {
    const { data } = await supa.from("profiles").select("credits").eq("id", user.id).maybeSingle()
    credits = data?.credits ?? null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Suspense>
              <SiteHeader credits={credits} />
            </Suspense>
            <main className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
            <SiteFooter />
            <LazyClientComponents />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
