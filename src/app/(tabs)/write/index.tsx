import MoodList from '@/components/features/mood/MoodList'
import { ScreenView } from '@/components/shared'
import Animated, { FadeIn } from 'react-native-reanimated'

const AnimatedView = Animated.createAnimatedComponent(ScreenView)

export default function MoodScreen() {
  return (
    <AnimatedView entering={FadeIn.duration(800)}>
      <MoodList />
    </AnimatedView>
  )
}
