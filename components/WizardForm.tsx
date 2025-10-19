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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

// As per the new plan
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
}

interface WizardFormProps {
  onGenerate: (data: GenerateRequest) => void;
  isGenerating: boolean;
  description?: string;
}

const TOTAL_STEPS = 5;

export function WizardForm({
  onGenerate,
  isGenerating,
  description,
}: WizardFormProps) {
  const [step, setStep] = useState(1);
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
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // TODO: Final validation before submitting
    onGenerate(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} />;
      default:
        return <Step1 formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>
          Step {step} of {TOTAL_STEPS}
        </CardTitle>
        {description && (
          <p className="text-muted-foreground text-sm pt-2">{description}</p>
        )}
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[300px]">{renderStep()}</div>
        <div className="flex justify-between pt-6 border-t border-border/50">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step === TOTAL_STEPS ? (
            <Button onClick={handleSubmit} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Generate Copy
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

type StepProps = {
  formData: GenerateRequest;
  setFormData: React.Dispatch<React.SetStateAction<GenerateRequest>>;
};

// Step 1: Screenshot Upload
function Step1({ setFormData }: StepProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold">Upload Your Screenshot</h2>
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
    </div>
  );
}

// Step 2: App Info
function Step2({ formData, setFormData }: StepProps) {
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, appCategory: "" })); // Clear category when switching to custom
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, appCategory: value }));
    }
  };

  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold">Tell Us About Your App</h2>
      <div className="space-y-2">
        <Label htmlFor="appName">App Name *</Label>
        <Input
          id="appName"
          value={formData.appName}
          onChange={e =>
            setFormData(prev => ({ ...prev, appName: e.target.value }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="appCategory">App Category *</Label>
        {!isCustomCategory ? (
          <Select
            value={formData.appCategory}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="appCategory">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
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
            onChange={e =>
              setFormData(prev => ({ ...prev, appCategory: e.target.value }))
            }
            placeholder="Enter custom category"
          />
        )}
        {isCustomCategory && (
          <Button variant="link" onClick={() => setIsCustomCategory(false)} className="px-0">
            Choose from list
          </Button>
        )}
      </div>
    </div>
  );
}

// Step 3: Target Audience
function Step3({ formData, setFormData }: StepProps) {
  const setAudience = (
    field: keyof GenerateRequest["targetAudience"],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: { ...prev.targetAudience, [field]: value },
    }));
  };
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold">Who Is This For?</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target Age</Label>
          <Select
            value={formData.targetAudience.age}
            onValueChange={v => setAudience("age", v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
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
          <Label>Main User Type</Label>
          <Select
            value={formData.targetAudience.occupation}
            onValueChange={v => setAudience("occupation", v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
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
        <Label>What problem does this solve for them? (Their Pain Point)</Label>
        <Textarea
          value={formData.targetAudience.painPoint}
          onChange={e => setAudience("painPoint", e.target.value)}
          placeholder="e.g., I keep forgetting my tasks and missing deadlines."
        />
      </div>
    </div>
  );
}

// Step 4: Screenshot Details
function Step4({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold">
        What&apos;s Shown in This Screenshot?
      </h2>
      <div className="space-y-2">
        <Label>Feature Shown</Label>
        <Textarea
          value={formData.screenFeature}
          onChange={e =>
            setFormData(prev => ({ ...prev, screenFeature: e.target.value }))
          }
          placeholder="e.g., Main dashboard with task list and calendar view."
        />
      </div>
      <div className="space-y-2">
        <Label>Key Benefit to Highlight</Label>
        <Input
          value={formData.keyBenefit}
          onChange={e =>
            setFormData(prev => ({ ...prev, keyBenefit: e.target.value }))
          }
          placeholder="e.g., See all your tasks at a glance"
        />
      </div>
      <div className="space-y-2">
        <Label>Competitors (optional, comma-separated)</Label>
        <Input
          value={formData.competitors}
          onChange={e =>
            setFormData(prev => ({ ...prev, competitors: e.target.value }))
          }
          placeholder="e.g., Todoist, Any.do"
        />
      </div>
    </div>
  );
}

// Step 5: Tone
function Step5({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold">Choose Your Tone</h2>
      <div className="space-y-2">
        <Label>Tone Preference *</Label>
        <Select
          value={formData.tonePreference}
          onValueChange={value =>
            setFormData(prev => ({ ...prev, tonePreference: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="playful">Playful</SelectItem>
            <SelectItem value="inspirational">Inspirational</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
