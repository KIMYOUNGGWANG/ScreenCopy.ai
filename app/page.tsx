import { Suspense } from "react"
import dynamic from "next/dynamic"

const HeroSection = dynamic(() => import("@/components/landing/HeroSection").then(mod => mod.HeroSection))
const BenefitsSection = dynamic(() => import("@/components/landing/BenefitsSection").then(mod => mod.BenefitsSection))
const HowItWorksSection = dynamic(() => import("@/components/landing/HowItWorksSection").then(mod => mod.HowItWorksSection))
const SamplePreviewSection = dynamic(() => import("@/components/landing/SamplePreviewSection").then(mod => mod.SamplePreviewSection))
const PricingTeaserSection = dynamic(() => import("@/components/landing/PricingTeaserSection").then(mod => mod.PricingTeaserSection))
const FaqSection = dynamic(() => import("@/components/landing/FaqSection").then(mod => mod.FaqSection))
const FinalCtaSection = dynamic(() => import("@/components/landing/FinalCtaSection").then(mod => mod.FinalCtaSection))

export const metadata = {
  title: "App Store Screenshot Copy Generator - Ready in 60 Seconds",
  description:
    "Generate concise, benefit-driven lines for each screenshot. Ready to test in minutes. Conversion-focused copy with one-click export.",
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={null}>
        <BenefitsSection />
      </Suspense>
      <Suspense fallback={null}>
        <HowItWorksSection />
      </Suspense>
      <Suspense fallback={null}>
        <SamplePreviewSection />
      </Suspense>
      <Suspense fallback={null}>
        <PricingTeaserSection />
      </Suspense>
      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={null}>
        <FinalCtaSection />
      </Suspense>
    </div>
  )
}