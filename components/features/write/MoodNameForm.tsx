import { useToastController } from '@tamagui/toast'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, View, YStack } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { FormInput } from '@/components/shared/FormInput'
import { H3 } from '@/components/shared/Heading'
import { ShakeEmoji } from '@/components/shared/ShakeEmoji'
import { useCallback, useEffect } from 'react'
import { XStack } from 'tamagui'

export const MoodNameForm = ({
  moodName,
  setMoodName,
}: {
  moodName: string
  setMoodName: (text: string) => void
}) => {
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
      setMoodName(text)
    },
    [moodName, setMoodName, toast, t],
  )

  return (
    <YStack gap='$4'>
      <XStack>
        <ShakeEmoji emoji='🫥' duration={3000} />
      </XStack>
      <YStack gap='$2'>
        <H3>{t('placeholders.moodName')}</H3>
        <BaseText fontSize='$4' color='$color10'>
          {t('warn.createMood.name.1')}
        </BaseText>
      </YStack>
      <FormInput
        placeholder={t('placeholders.moodName')}
        value={moodName}
        maxLength={10}
        onChangeText={handleChangeText}
      />
    </YStack>
  )
}
