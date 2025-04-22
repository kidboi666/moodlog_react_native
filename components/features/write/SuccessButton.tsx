import { ArrowRight } from '@tamagui/lucide-icons'

import { PressableButton } from '@/components/shared/PressableButton'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants/animations'
import { MoodLevel } from '@/types/mood.types'
import { AnimatePresence, View, YStack } from 'tamagui'

interface Props {
  name: string
  color: string
  onPress: () => void
}

export const SuccessButton = ({ name, color, onPress }: Props) => {
  const isDisabled = !name || !color

  return (
    <AnimatePresence presenceAffectsLayout>
      {name && color && (
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
