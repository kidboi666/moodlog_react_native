import { Check } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import {
  AnimatePresence,
  Button,
  GetThemeValueForKey,
  XStack,
  YStack,
} from 'tamagui'

import { BaseText } from '@/shared/components'
import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/shared/constants'
import { MoodLevel } from '@/shared/types'

interface Props {
  moodColor: string
  moodLevel?: MoodLevel
  setMoodLevel: (moodLevel: MoodLevel) => void
  show: boolean
}

export const MoodLevelForm = ({
  moodColor,
  moodLevel,
  setMoodLevel,
  show,
}: Props) => {
  const { t } = useTranslation()

  if (!show) {
    return null
  }

  return (
    <AnimatePresence>
      <YStack
        gap='$4'
        animation='lazy'
        enterStyle={MOUNT_STYLE}
        exitStyle={MOUNT_STYLE}
        animateOnly={MOUNT_STYLE_KEY}
      >
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
                <Check opacity={moodLevel === level ? 1 : 0} color='$color1' />
              </Button>
              <BaseText>{t(`moods.levels.${level}`)}</BaseText>
            </YStack>
          ))}
        </XStack>
      </YStack>
    </AnimatePresence>
  )
}
