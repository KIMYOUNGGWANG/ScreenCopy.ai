import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function EmptyPreviewPanel() {
  return (
    <Card className="h-full flex flex-col items-center justify-center text-center p-8">
      <CardHeader>
        <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <CardTitle className="text-2xl">No Copy Generated Yet</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          Your generated marketing copy will appear here. Fill out the form on the left to get started!
        </CardDescription>
      </CardContent>
    </Card>
  );
}
