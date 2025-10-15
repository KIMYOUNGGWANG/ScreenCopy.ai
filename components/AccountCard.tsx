"use client"

import { Download, Trash2, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface AccountCardProps {
  plan: "free" | "pro"
  credits: number
}

export function AccountCard({ plan, credits }: AccountCardProps) {
  const { toast } = useToast()

  const handleExportData = () => {
    // Dummy export function - would trigger actual data export in production
    toast({
      title: "Export initiated",
      description: "Your data export will be ready shortly. Check your email.",
    })
  }

  const handleRequestDeletion = () => {
    // Dummy deletion request - would trigger actual deletion flow in production
    toast({
      title: "Deletion request received",
      description: "We'll process your request within 30 days as required by GDPR.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Manage your account settings and data</CardDescription>
          </div>
          <Badge variant={plan === "pro" ? "default" : "secondary"} className="text-sm">
            {plan === "pro" ? "Pro Plan" : "Free Plan"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Credits Display */}
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Credits</p>
              <p className="text-2xl font-bold mt-1">
                {credits}
                <span className="text-base font-normal text-muted-foreground ml-2">
                  {plan === "free" ? "/ 3 per month" : "unlimited"}
                </span>
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10" aria-hidden="true">
              <span className="text-2xl font-bold text-accent">{credits}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 bg-transparent"
              onClick={handleExportData}
              aria-label="Export your account data as JSON"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export my data (JSON)
            </Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1">Download all your account data in JSON format</p>
          </div>

          <div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 bg-transparent"
              onClick={handleRequestDeletion}
              aria-label="Request account deletion"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Request deletion
            </Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1">
              Permanently delete your account and all associated data
            </p>
          </div>

          <div>
            <Button
              asChild
              className="w-full justify-start gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Manage your billing and subscription"
            >
              <Link href="/pricing">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Manage billing
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1">
              {plan === "free" ? "Upgrade to Pro for unlimited generations" : "View and manage your Pro subscription"}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded"
            >
              Contact support
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
