import type React from "react"
import type { Metadata } from "next/core"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Studio - Build Production-Ready Applications",
  description: "Modern development platform with database, authentication, edge functions, and more.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Suspense>
            <SiteHeader />
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
