import { AccountCard } from "@/components/AccountCard"
import { mockAccount } from "@/lib/mock"

export const metadata = {
  title: "Account | App Store Copy Generator",
  description: "Manage your account settings and data",
}

export default function AccountPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Account Settings</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            View your plan, manage your data, and control your account preferences
          </p>
        </div>

        {/* Account Card */}
        <AccountCard plan={mockAccount.plan} credits={mockAccount.credits} />
      </div>
    </div>
  )
}
