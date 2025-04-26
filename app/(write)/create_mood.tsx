import { Check } from '@tamagui/lucide-icons'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { YStack } from 'tamagui'

import { FormSection, MoodPreview } from '@/features/mood/components'
import { MoodService } from '@/features/mood/services'
import { StepProgressProvider } from '@/providers'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/shared/components'
import { ROUTE_DELAY_MS } from '@/shared/constants'
import { useMood, useUI } from '@/shared/store'
import { MoodName } from '@/shared/types'

export default function CreateMoodScreen() {
  const router = useRouter()
  const [moodName, setMoodName] = useState<MoodName>('')
  const sharedMoodColor = useSharedValue('#73bd79')
  const moods = useMood(state => state.moods)
  const addMyMood = useMood(state => state.addMood)
  const setNavigating = useUI(state => state.setNavigating)

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
      router.push({
        pathname: '/(write)',
        params: {
          moodName,
          moodColor: sharedMoodColor.value,
        },
      })

      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [moodName, router, setNavigating])

  return (
    <Delay flex={1}>
      <ViewContainer
        edges={['bottom']}
        Header={
          <HeaderContent
            leftAction={() => router.back()}
            rightAction={handlePress}
            rightActionIcon={Check}
            rightActionDisabled={!moodName || !sharedMoodColor.value}
          >
            <StepDot />
          </HeaderContent>
        }
      >
        <StepProgressProvider totalSteps={2}>
          <YStack flex={1} gap='$6'>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <YStack flex={1} gap='$4'>
                <MoodPreview name={moodName} color={sharedMoodColor} />
                <FormSection
                  name={moodName}
                  setName={setMoodName}
                  sharedColor={sharedMoodColor}
                />
              </YStack>
            </KeyboardAvoidingView>
          </YStack>
        </StepProgressProvider>
      </ViewContainer>
    </Delay>
  )
}
