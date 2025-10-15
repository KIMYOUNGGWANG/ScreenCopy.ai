"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>

        <p className="text-sm text-muted-foreground mb-12">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="leading-relaxed text-muted-foreground">
            We believe in collecting only what we need. This Privacy Policy explains what minimal data we collect, how
            we use it, and your rights regarding your information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            We collect minimal information necessary to provide our service:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong>Account data:</strong> Email address (for login and notifications)
            </li>
            <li>
              <strong>Usage data:</strong> Generation count, selected options (tone, goal, slide count)
            </li>
            <li>
              <strong>Payment data:</strong> Processed securely by Stripe (we do not store card details)
            </li>
            <li>
              <strong>Technical data:</strong> IP address, browser type (for security and analytics)
            </li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-4">
            We do <strong>not</strong> collect or store your app content, screenshots, or generated copy beyond the
            active session.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">Your data is used to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Provide and improve our copy generation service</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send service updates and security notifications</li>
            <li>Prevent abuse and ensure fair usage</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Data Retention and Deletion</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">We retain your data only as long as necessary:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong>Active accounts:</strong> Data retained while your account is active
            </li>
            <li>
              <strong>Inactive accounts:</strong> Automatically deleted after 12 months of inactivity
            </li>
            <li>
              <strong>Deleted accounts:</strong> All personal data removed within 30 days of deletion request
            </li>
            <li>
              <strong>Legal requirements:</strong> Some data may be retained longer if required by law (e.g., payment
              records for tax purposes)
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sub-Processors</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">
            We use trusted third-party services to operate our platform:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong>OpenAI:</strong> AI model provider for generating copy (processes your input prompts)
            </li>
            <li>
              <strong>Supabase:</strong> Database and authentication provider (stores account and usage data)
            </li>
            <li>
              <strong>Stripe:</strong> Payment processor (handles billing and subscription management)
            </li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-4">
            Each sub-processor has their own privacy policy and security measures. We ensure they meet our standards for
            data protection.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="leading-relaxed text-muted-foreground mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong>Export your data:</strong> Download all your account data in JSON format from your account page
            </li>
            <li>
              <strong>Delete your account:</strong> Request permanent deletion of your account and all associated data
            </li>
            <li>
              <strong>Access your data:</strong> View what personal information we have about you
            </li>
            <li>
              <strong>Correct your data:</strong> Update inaccurate or incomplete information
            </li>
            <li>
              <strong>Opt-out:</strong> Unsubscribe from marketing emails (service emails are required)
            </li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-4">
            To exercise these rights, use the controls in your account settings or contact us directly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <p className="leading-relaxed text-muted-foreground">
            We implement industry-standard security measures including encryption in transit (TLS), secure password
            hashing, and regular security audits. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update this Privacy Policy occasionally. Material changes will be communicated via email. Continued
            use of our service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="leading-relaxed text-muted-foreground">
            Questions about this Privacy Policy or your data? Contact us at{" "}
            <a href="mailto:privacy@example.com" className="text-primary hover:underline">
              privacy@example.com
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
