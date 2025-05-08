import { ImageService } from '@/shared/services'
import { JournalDraft, JournalMood, MoodLevel } from '@/shared/types'
import { useCallback, useState } from 'react'

export const useJournalDraftForm = () => {
  const [draft, setDraft] = useState<JournalDraft>({
    content: '',
    mood: {
      id: '',
      level: MoodLevel.HALF,
    },
    imageUri: [],
    localDate: '0000-00-00',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleIsLoadingChange = (bool: boolean) => {
    setIsLoading(bool)
  }

  const handleMoodIdChange = useCallback((id: string) => {
    setDraft(prev => ({
      ...prev,
      mood: {
        ...prev.mood,
        id,
      },
    }))
  }, [])

  const handleMoodLevelChange = useCallback((level: MoodLevel) => {
    setDraft(prev => ({
      ...prev,
      mood: {
        ...prev.mood,
        level,
      },
    }))
  }, [])

  const handleImageUriChange = useCallback(async () => {
    try {
      const newFilePath = await ImageService.createNewFileName()
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
