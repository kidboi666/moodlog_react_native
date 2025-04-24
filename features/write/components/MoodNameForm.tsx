import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { FormInput } from '@/shared/components/FormInput'

interface Props {
  width: number
  name: string
  setName: (text: string) => void
}

export const MoodNameForm = ({ width, name, setName }: Props) => {
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
      setName(text)
    },
    [name, setName, toast, t],
  )

  return (
    <YStack gap='$4' width={width}>
      <FormInput
        placeholder={t('placeholders.moodName')}
        value={name}
        maxLength={10}
        onChangeText={handleChangeText}
      />
    </YStack>
  )
}
