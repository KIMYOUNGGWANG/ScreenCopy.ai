import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCtaSection() {
  return (
    <section className="container w-full mx-auto py-20 md:py-32 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
          Ready to boost your App Store conversions?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          Start generating screenshot copy in seconds. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/auth/signin">
              Start free (3 credits)
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              View pricing
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
