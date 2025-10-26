import { howItWorksSteps } from "@/lib/mock"

export function HowItWorksSection() {
  return (
    <section className="container w-full mx-auto py-20 md:py-32 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">How it works</h2>
          <p className="text-lg text-muted-foreground text-pretty">Three simple steps to conversion-ready copy</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-balance">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
