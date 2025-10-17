import { Check } from "lucide-react"
import { benefits } from "@/lib/mock"

export function BenefitsSection() {
  return (
    <section className="container py-20 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col items-start">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Check className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-balance">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
