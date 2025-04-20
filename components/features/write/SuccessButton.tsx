import { ArrowRight } from '@tamagui/lucide-icons'

import { PressableButton } from '@/components/shared/PressableButton'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations'
import { MoodLevel } from '@/types/mood.types'
import { AnimatePresence, View, YStack } from 'tamagui'

interface Props {
  moodName: string
  moodColor: string
  moodLevel?: MoodLevel
  onPress: () => void
}

export const SuccessButton = ({
  moodName,
  moodColor,
  moodLevel,
  onPress,
}: Props) => {
  const isDisabled = !moodName || !moodColor || !moodLevel

  return (
    <AnimatePresence presenceAffectsLayout>
      {moodName && moodColor && moodLevel && (
        <View
          items='center'
          animation='lazy'
          enterStyle={MOUNT_STYLE}
          exitStyle={MOUNT_STYLE}
          animateOnly={MOUNT_STYLE_KEY}
        >
          <PressableButton
            icon={ArrowRight}
            onPress={onPress}
            disabled={isDisabled}
          />
        </View>
      )}
    </AnimatePresence>
  )
}
