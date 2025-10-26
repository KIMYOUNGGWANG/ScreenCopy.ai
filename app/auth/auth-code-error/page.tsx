import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function AuthCodeErrorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-center">Authentication Error</CardTitle>
            <CardDescription className="text-center">
              There was an error processing your authentication request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center space-y-2">
              <p>This could happen if:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>The confirmation link has expired</li>
                <li>The link has already been used</li>
                <li>There was a temporary server error</li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/auth/signin">Try Signing In Again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
