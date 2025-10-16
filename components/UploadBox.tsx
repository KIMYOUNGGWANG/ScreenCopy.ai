"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UploadBoxProps {
  onFileChange: (file: File | null) => void
  error?: string
}

export default function UploadBox({ onFileChange, error }: UploadBoxProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    onFileChange(file)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="screenshot">
        Screenshot <span className="text-destructive">*</span>
      </Label>
      <Input
        id="screenshot"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        aria-describedby={error ? "file-error" : undefined}
      />
      {error && (
        <p id="file-error" className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
