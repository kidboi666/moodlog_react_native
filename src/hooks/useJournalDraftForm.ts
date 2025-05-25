import { useState } from 'react'

import { JournalDraft, MoodLevel } from '@/types'
import { createNewFileName } from '@/utils'

export const useJournalDraftForm = (initialMood: string) => {
  const [draft, setDraft] = useState<JournalDraft>({
    content: '',
    moodName: initialMood,
    imageUri: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContentChange = (text: string) => {
    setDraft(prev => ({ ...prev, content: text }))
  }

  const handleMoodIdChange = (id: number) => {
    setDraft(prev => ({ ...prev, moodId: id }))
  }

  const handleMoodLevelChange = (moodLevel: MoodLevel) => {
    setDraft(prev => ({ ...prev, moodLevel }))
  }

  const handleAddImage = async () => {
    try {
      const newFilePath = await createNewFileName()
      if (newFilePath) {
        setDraft(prev => ({
          ...prev,
          imageUri: [...prev.imageUri, newFilePath],
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleRemoveImage = (imageUris: string[], index: number) => {
    const newImageUris = [...imageUris]
    newImageUris.splice(index, 1)
    setDraft(prev => ({
      ...prev,
      imageUri: newImageUris,
    }))
  }

  return {
    draft,
    isSubmitting,
    setIsSubmitting,
    onContentChange: handleContentChange,
    onMoodIdChange: handleMoodIdChange,
    onMoodLevelChange: handleMoodLevelChange,
    onImageUriChange: handleAddImage,
    onImageUriRemove: handleRemoveImage,
  }
}
