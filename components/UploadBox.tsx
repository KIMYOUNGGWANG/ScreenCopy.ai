'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import Image from 'next/image'

interface UploadBoxProps {
  onFileChange: (file: File | null) => void
}

export default function UploadBox({ onFileChange }: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      onFileChange(file)
      setPreview(URL.createObjectURL(file))
    }
  }, [onFileChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  const removeFile = () => {
    onFileChange(null)
    setPreview(null)
  }

  return (
    <div
      {...getRootProps()}
      className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
      ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          <Image
            src={preview}
            alt="Screenshot preview"
            layout="fill"
            objectFit="contain"
            className="rounded-lg p-2"
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              removeFile()
            }}
            className="absolute top-2 right-2 bg-background rounded-full p-1 shadow-md"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold">스크린샷을 드래그 앤 드롭하세요</p>
          <p className="text-sm text-muted-foreground">또는 클릭해서 파일을 선택하세요</p>
          <p className="text-xs text-muted-foreground mt-2">PNG, JPG, WEBP (최대 5MB)</p>
        </div>
      )}
    </div>
  )
}
