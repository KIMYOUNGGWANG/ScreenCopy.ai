import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function PreviewPanelSkeleton() {
  return (
    <div className="space-y-8">
      {/* Live Preview Skeleton */}
      <div>
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="aspect-[9/16] w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="aspect-[9/16] w-full" />
          </div>
        </div>
      </div>

      {/* Analysis & Results Skeleton */}
      <div>
        <Skeleton className="h-7 w-56 mb-4" />
        <div className="w-full">
          <div className="flex gap-2 w-full justify-start overflow-x-auto border-b">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-4/5" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <Skeleton className="h-9 w-36" />
                <div className="mt-4 p-4 bg-muted/20 rounded-lg border">
                  <Skeleton className="h-5 w-24 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Skeleton className="h-4 w-28 mb-2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
