import { Trash } from '@tamagui/lucide-icons'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { XStack, styled } from 'tamagui'

import { PressableButton } from '@/components/shared'

interface ActionButtonProps {
  showActionButton: boolean
  onPress: () => void
}

export function ActionButton({ showActionButton, onPress }: ActionButtonProps) {
  return (
    showActionButton && (
      <AnimatedBox
        entering={FadeIn.duration(800)}
        exiting={FadeOut.duration(300)}
      >
        <PressableButton
          circular={true}
          chromeless={true}
          scaleIcon={1.5}
          bg='$red10'
          color='white'
          shadowColor='#000'
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.2}
          shadowRadius={1.5}
          elevation={2}
          icon={Trash}
          onPress={onPress}
        />
      </AnimatedBox>
    )
  )
}

const ActionBox = styled(XStack, {
  r: 0,
  position: 'absolute',
  height: '100%',
  items: 'center',
  justify: 'center',
  px: 16,
  z: -1,
})

const AnimatedBox = Animated.createAnimatedComponent(ActionBox)
