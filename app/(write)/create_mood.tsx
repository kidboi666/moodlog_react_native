import { Check } from '@tamagui/lucide-icons'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { getToken } from 'tamagui'

import { FormSection, MoodPreviewItem } from '@/features/mood/components'
import { MoodService } from '@/features/mood/services'
import { StepProgressProvider } from '@/providers'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/shared/components'
import { WaveEffect } from '@/shared/components/WaveEffect'
import { DelayMS } from '@/shared/constants'
import { useMood, useUI } from '@/shared/store'
import { MoodName } from '@/shared/types'

export default function CreateMoodScreen() {
  const router = useRouter()
  const [moodName, setMoodName] = useState<MoodName>('')
  const sharedMoodColor = useSharedValue('#73bd79')
  const moods = useMood(state => state.moods)
  const addMyMood = useMood(state => state.addMood)
  const setNavigating = useUI(state => state.setNavigating)
  const [isActive, setIsActive] = useState(false)

  const handlePress = useCallback(() => {
    setNavigating(true)
    const newMood = {
      id: Crypto.randomUUID(),
      name: moodName,
      color: sharedMoodColor.value,
      createdAt: new Date().toISOString(),
    }
    const updatedMoods = MoodService.addMood(moods, newMood)
    addMyMood(updatedMoods)

    const timer = setTimeout(() => {
      router.replace({
        pathname: '/(tabs)',
        params: {
          moodName,
          moodColor: sharedMoodColor.value,
        },
      })

      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, DelayMS.ROUTE)

    return () => clearTimeout(timer)
  }, [moodName, router, setNavigating])

  return (
    <StepProgressProvider totalSteps={2}>
      <ViewContainer
        edges={['bottom']}
        Header={
          <HeaderContent
            leftAction={() => router.back()}
            rightAction={() => setIsActive(prev => !prev)}
            // rightAction={handlePress}
            rightActionIcon={Check}
            rightActionDisabled={!moodName || !sharedMoodColor.value}
          >
            <StepDot />
          </HeaderContent>
        }
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          contentContainerStyle={styles.keyboardAvoidingViewInner}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <WaveEffect active={isActive} color={sharedMoodColor} />
          <Delay flex={1}>
            <MoodPreviewItem name={moodName} color={sharedMoodColor} />
          </Delay>
          <Delay>
            <FormSection
              name={moodName}
              setName={setMoodName}
              sharedColor={sharedMoodColor}
            />
          </Delay>
        </KeyboardAvoidingView>
      </ViewContainer>
    </StepProgressProvider>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    gap: getToken('$4'),
  },
  keyboardAvoidingViewInner: {
    flex: 1,
  },
})
