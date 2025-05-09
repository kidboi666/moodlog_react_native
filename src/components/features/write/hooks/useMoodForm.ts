import { useCallback, useState } from 'react'
import { useTheme } from 'tamagui'

import { MoodDraft } from '@/types'

export const useMoodForm = () => {
  const theme = useTheme()
  const [mood, setMood] = useState<MoodDraft>({
    name: '',
    color: theme.green9.val,
  })
  const [isSuccess, setIsSuccess] = useState(false)

  const handleMoodNameChange = useCallback((name: string) => {
    setMood(prev => ({
      ...prev,
      name,
    }))
  }, [])

  const handleMoodColorChange = useCallback((color: string) => {
    setMood(prev => ({
      ...prev,
      color,
    }))
  }, [])

  const handleIsSuccessChange = useCallback((bool: boolean) => {
    setIsSuccess(bool)
  }, [])

  return {
    mood,
    isSuccess,
    onMoodNameChange: handleMoodNameChange,
    onMoodColorChange: handleMoodColorChange,
    onIsSuccessChange: handleIsSuccessChange,
  }
}
