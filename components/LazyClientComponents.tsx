'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const SiteFooter = dynamic(() => import('@/components/site-footer').then(mod => mod.SiteFooter), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster), { ssr: false })

export function LazyClientComponents() {
  return (
    <>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </>
  )
}
