"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function TermsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>

        <p className="text-sm text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="leading-relaxed text-muted-foreground">
            By accessing or using our App Store screenshot copy generation service, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            Our service provides AI-powered copy generation for App Store screenshots. We offer:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Free tier: 3 generations per month with basic features</li>
            <li>Pro tier: Unlimited generations (fair use) with advanced features</li>
            <li>Multiple tone options and slide configurations</li>
            <li>Export capabilities in CSV and JSON formats</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Account Registration</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">To use our service, you must:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Be at least 18 years old or have parental consent</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-4">
            You are responsible for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Generate content that is offensive, discriminatory, or harmful</li>
            <li>Attempt to reverse engineer or exploit our AI models</li>
            <li>Share your account credentials with others</li>
            <li>Abuse the &quot;fair use&quot; policy on Pro plans through excessive automated requests</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Subscription and Billing</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">For Pro subscriptions:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Billing is monthly and automatic</li>
            <li>You can cancel anytime—subscriptions are month-to-month</li>
            <li>Cancellations take effect at the end of the current billing period</li>
            <li>No refunds for partial months</li>
            <li>Prices may change with 30 days notice</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-4">
            All payments are processed securely through Stripe.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            <strong>Your content:</strong> You retain all rights to the copy generated using our service. You may use it
            commercially without attribution.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            <strong>Our service:</strong> The platform, including all software, designs, and documentation, is owned by
            us and protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
          <p className="leading-relaxed text-muted-foreground">
            We strive for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance, updates,
            or modifications at any time. We are not liable for any downtime or service interruptions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="leading-relaxed text-muted-foreground">
            To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or
            consequential damages arising from your use of the service. Our total liability shall not exceed the amount
            you paid us in the past 12 months.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">AI-Generated Content Disclaimer</h2>
          <p className="leading-relaxed text-muted-foreground">
            Our service uses AI to generate copy. While we strive for quality, AI-generated content may occasionally be
            inaccurate, inappropriate, or require editing. You are responsible for reviewing and approving all generated
            content before use.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p className="leading-relaxed text-muted-foreground">
            We may suspend or terminate your account if you violate these Terms. You may delete your account at any time
            from your account settings. Upon termination, your right to use the service ceases immediately.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update these Terms from time to time. Material changes will be communicated via email. Continued use
            of the service after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="leading-relaxed text-muted-foreground">
            These Terms are governed by the laws of the jurisdiction in which we operate, without regard to conflict of
            law principles. Any disputes shall be resolved in the courts of that jurisdiction.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="leading-relaxed text-muted-foreground">
            Questions about these Terms? Contact us at{" "}
            <a href="mailto:legal@example.com" className="text-primary hover:underline">
              legal@example.com
            </a>
          </p>
        </section>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}