import { create } from 'zustand'

import { JournalDraft, MoodLevel, MoodName } from '@/src/shared/types'
import { createNewFileName } from '@/src/shared/utils'

interface StoreState {
  draft: JournalDraft
  onContentChange: (content: string) => void
  onMoodNameChange: (moodName: MoodName) => void
  onMoodLevelChange: (moodLevel: MoodLevel) => void
  onAiResponseChange: (aiResponseEnabled: boolean) => void
  onAddImage: () => void
  resetDraft: () => void
  onRemoveImage: (imageUris: string[], index: number) => void
}

const initialDraft = {
  content: '',
  moodName: MoodName.HAPPY,
  imageUri: [],
  aiResponseEnabled: false,
}

export const useDraft = create<StoreState>(set => ({
  draft: initialDraft,

  resetDraft: () => set({ draft: initialDraft }),

  onContentChange: (content: string) =>
    set(state => ({
      ...state,
      draft: { ...state.draft, content },
    })),

  onMoodNameChange: (moodName: MoodName) =>
    set(state => ({
      ...state,
      draft: { ...state.draft, moodName },
    })),

  onMoodLevelChange: (moodLevel: MoodLevel) =>
    set(state => ({
      ...state,
      draft: { ...state.draft, moodLevel },
    })),

  onAiResponseChange: (aiResponseEnabled: boolean) =>
    set(state => ({
      ...state,
      draft: { ...state.draft, aiResponseEnabled },
    })),

  onAddImage: async () => {
    try {
      const newFilePath = await createNewFileName()
      if (newFilePath) {
        set(state => ({
          ...state,
          draft: {
            ...state.draft,
            imageUri: [...state.draft.imageUri, newFilePath],
          },
        }))
      }
    } catch (e) {
      console.error(e)
    }
  },

  onRemoveImage: (imageUris: string[], index: number) => {
    const newImageUris = [...imageUris]
    newImageUris.splice(index, 1)
    set(state => ({
      ...state,
      draft: { ...state.draft, imageUri: newImageUris },
    }))
  },
}))
