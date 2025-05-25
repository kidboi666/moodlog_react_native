import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { MoodList } from '@/components/features/mood'
import { ScreenView } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'
import { ScrollView } from 'react-native-gesture-handler'

const duration = 600
const AnimatedView = Animated.createAnimatedComponent(ScreenView)

export default function MoodScreen() {
  const router = useRouter()
  const { setStep } = useStepProgress()

  const handleNextButton = async (moodName: string) => {
    setTimeout(() => {
      setStep(1)
      router.push({
        pathname: '/write/journal',
        params: {
          moodName,
        },
      })
    }, DelayMS.WAIT.SELECT_MOOD)
  }

  useFocusEffect(
    useCallback(() => {
      setStep(0)
    }, []),
  )

  return (
    <AnimatedView
      entering={FadeIn.duration(duration)}
      exiting={FadeOut.duration(duration)}
      style={styles.container}
    >
      <ScrollView>
        <MoodList onMoodChange={handleNextButton} duration={duration} />
      </ScrollView>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
})
