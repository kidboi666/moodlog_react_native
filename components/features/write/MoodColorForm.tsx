import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AnimatePresence,
  Button,
  GetThemeValueForKey,
  Separator,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import { PressableButton } from '@/components/shared/PressableButton'
import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/animations'
import { Check } from '@tamagui/lucide-icons'

// 감정 색상 팔레트
const MOOD_COLORS = [
  '$red10',
  '$orange10',
  '$green10',
  '$blue10',
  '$yellow10',
  '$purple10',
  '$pink10',
  '$gray10',
]

export const MoodColorForm = ({
  moodName,
  moodColor,
  setMoodColor,
}: {
  moodName: string
  moodColor: string
  setMoodColor: (color: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {moodName && (
        <YStack
          animation='lazy'
          enterStyle={MOUNT_STYLE}
          exitStyle={MOUNT_STYLE}
          animateOnly={MOUNT_STYLE_KEY}
          gap='$4'
        >
          <Separator />
          <YStack gap='$2'>
            <H3>{t('moods.my.moodColor.title')}</H3>
            <BaseText fontSize='$4' color='$color10'>
              {t('moods.my.moodColor.description')}
            </BaseText>
          </YStack>

          <XStack flexWrap='wrap' justify='space-around' gap='$2'>
            {MOOD_COLORS.map((color, index) => (
              <Button
                animation='bouncy'
                pressStyle={PRESS_STYLE}
                animateOnly={PRESS_STYLE_KEY}
                key={`${index}-${color}`}
                bg={color as GetThemeValueForKey<'backgroundColor'>}
                onPress={() => setMoodColor(color)}
              >
                {moodColor === color && (
                  <Check color='$color1' position='absolute' />
                )}
              </Button>
            ))}
          </XStack>
        </YStack>
      )}
    </AnimatePresence>
  )
}
