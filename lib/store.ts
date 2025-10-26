import { create } from 'zustand';
import type { Slide } from '@/app/studio/studio-client-page';

// State Interface
interface StudioState {
  generatedSlides: Slide[] | null;
  isGenerating: boolean;
  error: string | null;
  screenshotObjectUrl: string | null;
  generationId: string | null;
  
  // Actions
  startGeneration: (screenshotFile: File) => void;
  setGeneratedData: (data: { slides: Slide[], generationId: string }) => void;
  setGenerationError: (error: string) => void;
  clearError: () => void;
  resetState: () => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  // Initial State
  generatedSlides: null,
  isGenerating: false,
  error: null,
  screenshotObjectUrl: null,
  generationId: null,

  // Actions
  startGeneration: (screenshotFile) => {
    // Revoke previous URL if it exists
    const { screenshotObjectUrl: prevUrl } = get();
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }

    const objectUrl = URL.createObjectURL(screenshotFile);
    set({ 
      isGenerating: true, 
      error: null, 
      screenshotObjectUrl: objectUrl,
      generationId: null, // Reset on new generation
      generatedSlides: null, // Clear previous results
    });
  },
  
  setGeneratedData: (data) => set({
    isGenerating: false,
    generatedSlides: data.slides,
    generationId: data.generationId,
  }),

  setGenerationError: (error) => set({
    isGenerating: false,
    error: error,
  }),

  clearError: () => set({ error: null }),

  resetState: () => {
    const { screenshotObjectUrl } = get();
    if (screenshotObjectUrl) {
      URL.revokeObjectURL(screenshotObjectUrl);
    }
    set({
      generatedSlides: null,
      isGenerating: false,
      error: null,
      screenshotObjectUrl: null,
      generationId: null,
    });
  },
}));
