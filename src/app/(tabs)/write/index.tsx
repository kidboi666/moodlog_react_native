import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { useDraft } from '@/src/data/store'
import { MoodList } from '@/src/features/mood'
import { ScreenView } from '@/src/shared/components'
import { useStepProgress } from '@/src/shared/context'
import { MoodName } from '@/src/shared/types'

const duration = 600
const AnimatedView = Animated.createAnimatedComponent(ScreenView)

export default function MoodScreen() {
  const router = useRouter()
  const { setStep } = useStepProgress()
  const { onMoodNameChange } = useDraft()

  const handleNextButton = async (moodName: MoodName) => {
    onMoodNameChange(moodName)
    setStep(1)
    router.push('/write/journal')
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
