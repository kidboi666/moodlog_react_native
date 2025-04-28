import { useCallback, useState } from 'react'

import { ImageService } from '@/shared/services'
import { Draft, MoodLevel } from '@/shared/types'

export const useDraftManage = (moodId: string, moodLevel: MoodLevel) => {
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      id: moodId,
      level: moodLevel as MoodLevel,
    },
    imageUri: [],
  })

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }))
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

  return {
    onContentChange: handleContentChange,
    onImageUriChange: handleImageUriChange,
    draft,
  }
}
