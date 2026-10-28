import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { FinalCtaSection } from '@/components/landing/FinalCtaSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { PricingTeaserSection } from '@/components/landing/PricingTeaserSection'
import { SamplePreviewSection } from '@/components/landing/SamplePreviewSection'
import MarketingLayout from '@/components/layout/marketing-layout'

export default function Home() {
  return (
    <MarketingLayout>
      <HeroSection />
      <SamplePreviewSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PricingTeaserSection />
      <FaqSection />
      <FinalCtaSection />
    </MarketingLayout>
  )
}