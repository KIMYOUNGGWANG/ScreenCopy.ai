"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, User, Target } from "lucide-react";
import { useStudioStore } from "@/lib/store";

export interface GenerateRequest {
  screenshotFile: File | null;
  appName: string;
  appCategory: string;
  targetAudience: {
    age: string;
    occupation: string;
    painPoint: string;
  };
  screenFeature: string;
  tonePreference: string;
  keyBenefit: string;
  competitors: string;
  keywords: string;
  exclude: string;
}

interface WizardFormProps {
  onGenerate: (data: GenerateRequest) => void;
}

export function WizardForm({ onGenerate }: WizardFormProps) {
  const { isGenerating } = useStudioStore();
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [formData, setFormData] = useState<GenerateRequest>({
    screenshotFile: null,
    appName: "",
    appCategory: "productivity",
    targetAudience: {
      age: "18-24",
      occupation: "student",
      painPoint: "",
    },
    screenFeature: "",
    tonePreference: "professional",
    keyBenefit: "",
    competitors: "",
    keywords: "",
    exclude: "",
  });

  const setAudience = (
    field: keyof GenerateRequest["targetAudience"],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: { ...prev.targetAudience, [field]: value },
    }));
  };

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, appCategory: "" }));
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, appCategory: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Generate Screenshot Copy</CardTitle>
        <CardDescription>Fill out the details below to get the best results.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Persona Section */}
          <div className="space-y-6 rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 bg-muted rounded-full p-2">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Persona</h2>
            </div>
            <p className="text-sm text-muted-foreground -mt-2">
              Who is your target user? This helps tailor the copy to their needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Age *</Label>
                <Select
                  value={formData.targetAudience.age}
                  onValueChange={v => setAudience("age", v)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13-17">13-17</SelectItem>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25-34">25-34</SelectItem>
                    <SelectItem value="35-44">35-44</SelectItem>
                    <SelectItem value="45+">45+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Main User Type *</Label>
                <Select
                  value={formData.targetAudience.occupation}
                  onValueChange={v => setAudience("occupation", v)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="creator">Creator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>What problem does this solve for them? (Their Pain Point) *</Label>
              <Textarea
                value={formData.targetAudience.painPoint}
                onChange={e => setAudience("painPoint", e.target.value)}
                placeholder="e.g., I keep forgetting my tasks and missing deadlines."
              />
            </div>
          </div>

          {/* Goal Section */}
          <div className="space-y-6 rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 bg-muted rounded-full p-2">
                <Target className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Goal</h2>
            </div>
            <p className="text-sm text-muted-foreground -mt-2">
              What is the core message you want to convey?
            </p>

            <div className="space-y-2">
              <Label htmlFor="screenshot">Screenshot File *</Label>
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0] ?? null;
                  setFormData(prev => ({ ...prev, screenshotFile: file }));
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appName">App Name *</Label>
                <Input
                  id="appName"
                  value={formData.appName}
                  onChange={e => setFormData(prev => ({ ...prev, appName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appCategory">App Category *</Label>
                {!isCustomCategory ? (
                  <Select value={formData.appCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="appCategory"><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="game">Game</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="health">Health & Fitness</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="custom">Other (please specify)</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="appCategory"
                    value={formData.appCategory}
                    onChange={e => setFormData(prev => ({ ...prev, appCategory: e.target.value }))}
                    placeholder="Enter custom category"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Feature Shown in Screenshot *</Label>
              <Textarea
                value={formData.screenFeature}
                onChange={e => setFormData(prev => ({ ...prev, screenFeature: e.target.value }))}
                placeholder="e.g., Main dashboard with task list and calendar view."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Key Benefit to Highlight *</Label>
              <Input
                value={formData.keyBenefit}
                onChange={e => setFormData(prev => ({ ...prev, keyBenefit: e.target.value }))}
                placeholder="e.g., See all your tasks at a glance"
              />
            </div>

            <div className="space-y-2">
              <Label>Required Keywords (optional, comma-separated)</Label>
              <Input
                value={formData.keywords}
                onChange={e => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="e.g., simple, fast, integrated"
              />
            </div>

            <div className="space-y-2">
              <Label>Content to Exclude (optional, comma-separated)</Label>
              <Input
                value={formData.exclude}
                onChange={e => setFormData(prev => ({ ...prev, exclude: e.target.value }))}
                placeholder="e.g., complicated, slow, for experts"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tone Preference *</Label>
                <Select
                  value={formData.tonePreference}
                  onValueChange={value => setFormData(prev => ({ ...prev, tonePreference: value }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Competitors (optional, comma-separated)</Label>
                <Input
                  value={formData.competitors}
                  onChange={e => setFormData(prev => ({ ...prev, competitors: e.target.value }))}
                  placeholder="e.g., Todoist, Any.do"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Copy"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}