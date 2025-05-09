import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { FormInput } from '@/components/shared'

interface Props {
  width: number
  moodName: string
  onMoodNameChange: (text: string) => void
}

export const MoodNameForm = ({ width, moodName, onMoodNameChange }: Props) => {
  const { t } = useTranslation()
  const toast = useToastController()

  const handleChangeText = useCallback(
    (text: string) => {
      if (text.length >= 10) {
        toast.show(t('warn.createMood.name.2'), {
          preset: 'warning',
        })
        return
      }
      onMoodNameChange(text)
    },
    [moodName, onMoodNameChange, toast, t],
  )

  return (
    <YStack gap='$4' width={width}>
      <FormInput
        placeholder={t('placeholders.moodName')}
        value={moodName}
        onChangeText={handleChangeText}
      />
    </YStack>
  )
}
