import { Check } from '@tamagui/lucide-icons'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { getToken, useTheme } from 'tamagui'

import {
  FormSection,
  MoodPreviewItem,
  SuccessCreateMoodEffect,
} from '@/features/mood/components'
import { MoodService } from '@/features/mood/services'
import { StepProgressProvider } from '@/providers'
import { HeaderContent, StepDot, ViewContainer } from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useMood, useUI } from '@/shared/store'
import { MoodName } from '@/shared/types'
import { delay } from '@/shared/utils'

export default function CreateMoodScreen() {
  const router = useRouter()
  const theme = useTheme()
  const [moodName, setMoodName] = useState<MoodName>('')
  const sharedMoodColor = useSharedValue(theme.green9.val)
  const moods = useMood(state => state.moods)
  const addMyMood = useMood(state => state.addMood)
  const setNavigating = useUI(state => state.setNavigating)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSuccess = useCallback(async () => {
    setIsSuccess(true)

    const animationTimer = setTimeout(() => {
      setIsSuccess(false)
    }, DelayMS.ANIMATION.LONG[2])

    await delay(DelayMS.WAIT.WRITE_MOOD, () => {
      router.replace({
        pathname: '/(tabs)',
        params: {
          moodName,
          moodColor: sharedMoodColor.value,
        },
      })
    })

    return () => clearTimeout(animationTimer)
  }, [])

  const handleSubmit = useCallback(async () => {
    const newMood = {
      id: Crypto.randomUUID(),
      name: moodName,
      color: sharedMoodColor.value,
      createdAt: new Date().toISOString(),
    }
    const updatedMoods = MoodService.addMood(moods, newMood)
    addMyMood(updatedMoods)

    handleSuccess()
  }, [moodName, router, setNavigating])

  return (
    <StepProgressProvider totalSteps={2}>
      <ViewContainer
        edges={['bottom']}
        Header={
          <HeaderContent
            leftAction={() => router.back()}
            rightAction={handleSubmit}
            rightActionIcon={Check}
            rightActionDisabled={!moodName || !sharedMoodColor.value}
          >
            <StepDot />
          </HeaderContent>
        }
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <MoodPreviewItem name={moodName} color={sharedMoodColor} />
          <FormSection
            name={moodName}
            setName={setMoodName}
            sharedColor={sharedMoodColor}
          />
          <SuccessCreateMoodEffect active={isSuccess} color={sharedMoodColor} />
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
})
