import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"
import { supaServer } from "@/lib/supa"

export const metadata: Metadata = {
  title: "Screenshot Copy - AI-Powered App Store Marketing",
  description: "Generate compelling App Store marketing copy from your screenshots in seconds.",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supa = await supaServer()
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
        <div className="flex min-h-screen flex-col">
          <Suspense>
            <SiteHeader credits={credits} />
          </Suspense>
          <main className="flex-1">
            <Suspense>{children}</Suspense>
          </main>
          <Suspense>
            <SiteFooter />
          </Suspense>
        </div>
        <Suspense>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
