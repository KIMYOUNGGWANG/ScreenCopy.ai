import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function WizardFormSkeleton() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="h-4 w-4/5 mt-2" />
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Persona Section Skeleton */}
        <div className="space-y-6 rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Goal Section Skeleton */}
        <div className="space-y-6 rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}
