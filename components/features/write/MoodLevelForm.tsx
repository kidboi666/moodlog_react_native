import { Button, GetThemeValueForKey, Separator, XStack, YStack } from 'tamagui'
import { AnimatePresence } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/styles/animations'
import { MoodLevel } from '@/types'
import { Check } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
export const MoodLevelForm = ({
  moodName,
  moodColor,
  moodLevel,
  setMoodLevel,
}: {
  moodName: string
  moodColor: string
  moodLevel?: MoodLevel
  setMoodLevel: (moodLevel: MoodLevel) => void
}) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence presenceAffectsLayout>
      {moodName && moodColor && (
        <YStack
          gap='$4'
          animation='lazy'
          enterStyle={MOUNT_STYLE}
          exitStyle={MOUNT_STYLE}
          animateOnly={MOUNT_STYLE_KEY}
        >
          <Separator />
          <YStack gap='$2'>
            <H3>{t('moods.my.moodLevel.title')}</H3>
            <BaseText fontSize='$4' color='$color10'>
              {t('moods.my.moodLevel.description')}
            </BaseText>
          </YStack>
          <XStack justify='space-between'>
            {Object.values(MoodLevel).map((level, i) => (
              <YStack key={level} items='center' gap='$2'>
                <Button
                  size='$4'
                  animation='bouncy'
                  pressStyle={PRESS_STYLE}
                  animateOnly={PRESS_STYLE_KEY}
                  bg={moodColor as GetThemeValueForKey<'backgroundColor'>}
                  opacity={(i + 1) / Object.values(MoodLevel).length}
                  onPress={() => setMoodLevel(level)}
                >
                  <Check
                    opacity={moodLevel === level ? 1 : 0}
                    color='$color1'
                  />
                </Button>
                <BaseText>{t(`moods.levels.${level}`)}</BaseText>
              </YStack>
            ))}
          </XStack>
        </YStack>
      )}
    </AnimatePresence>
  )
}
