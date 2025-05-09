import { useCallback, useState } from 'react'

import { JournalDraft, MoodLevel } from '@/types'
import { ImageUtils } from '@/utils'

export const useJournalDraftForm = (initialMoodId?: string) => {
  const [draft, setDraft] = useState<JournalDraft>({
    content: '',
    moodId: initialMoodId ?? '',
    moodLevel: MoodLevel.HALF,
    imageUri: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleIsLoadingChange = (bool: boolean) => {
    setIsLoading(bool)
  }

  const handleMoodIdChange = useCallback((moodId: string) => {
    setDraft(prev => ({
      ...prev,
      moodId,
    }))
  }, [])

  const handleMoodLevelChange = useCallback((moodLevel: MoodLevel) => {
    setDraft(prev => ({
      ...prev,
      moodLevel,
    }))
  }, [])

  const handleImageUriChange = useCallback(async () => {
    try {
      const newFilePath = await ImageUtils.createNewFileName()
      if (newFilePath) {
        setDraft(prev => ({
          ...prev,
          imageUri: [...prev.imageUri, newFilePath],
        }))
      }
    } catch (err) {
      console.error('이미지 저장 오류:', err)
    }
  }, [])

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({
      ...prev,
      content,
    }))
  }, [])

  const handleImageUriRemove = useCallback(
    (imageUris: string[], index: number) => {
      const newImageUris = [...imageUris]
      newImageUris.splice(index, 1)
      setDraft(prev => ({
        ...prev,
        imageUri: newImageUris,
      }))
    },
    [],
  )

  return {
    draft,
    isLoading,
    onContentChange: handleContentChange,
    onImageUriRemove: handleImageUriRemove,
    onMoodIdChange: handleMoodIdChange,
    onMoodLevelChange: handleMoodLevelChange,
    onImageUriChange: handleImageUriChange,
    onIsLoadingChange: handleIsLoadingChange,
  }
}
