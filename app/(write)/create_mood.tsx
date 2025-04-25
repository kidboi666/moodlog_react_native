import { useToastController } from '@tamagui/toast'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { CalendarUtils } from 'react-native-calendars'
import { useSharedValue } from 'react-native-reanimated'
import { YStack } from 'tamagui'

import { JournalUtils } from '@/features/journal/utils'
import { MoodService } from '@/features/mood/services'
import {
  FormSection,
  MoodPreview,
  SuccessButton,
} from '@/features/write/components'
import { StepProgressProvider } from '@/providers'
import { AnimatedEntry, ViewContainer } from '@/shared/components'
import { KEYBOARD_VERTICAL_OFFSET, ROUTE_DELAY_MS } from '@/shared/constants'
import { useJournal, useMood, useUI } from '@/shared/store'
import { MoodName } from '@/shared/types'

export default function CreateMoodScreen() {
  const router = useRouter()
  const toast = useToastController()
  const { t } = useTranslation()
  const store = useJournal(state => state.store)
  const [moodName, setMoodName] = useState<MoodName>('')
  const [moodColor, setMoodColor] = useState('')
  const sharedMoodColor = useSharedValue('#73bd79')
  const moods = useMood(state => state.moods)
  const addMyMood = useMood(state => state.addMood)
  const setNavigating = useUI(state => state.setNavigating)

  useEffect(() => {
    const todayDate = CalendarUtils.getCalendarDateString(new Date())
    const todayMoods = JournalUtils.getMoodForDate(store, todayDate)

    if (todayMoods && todayMoods.length > 0) {
      const todayMood = todayMoods[0]
      setMoodName(todayMood.name)

      toast.show(t('notifications.warning.moodLimit.title'), {
        message: t('notifications.warning.moodLimit.message'),
        preset: 'notice',
      })
    }
  }, [toast, t])

  const handlePress = useCallback(() => {
    if (!moodName || !moodColor) setNavigating(true)
    const newMood = {
      id: Crypto.randomUUID(),
      name: moodName,
      color: moodColor,
      createdAt: new Date().toISOString(),
    }
    const updatedMoods = MoodService.addMood(moods, newMood)
    addMyMood(updatedMoods)
    const timer = setTimeout(() => {
      router.push({
        pathname: '/(write)',
        params: {
          moodName,
          moodColor,
        },
      })

      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [moodName, router, setNavigating])

  return (
    <AnimatedEntry flex={1}>
      <ViewContainer edges={['bottom']}>
        <StepProgressProvider totalSteps={2}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
          >
            <YStack flex={1} gap='$6'>
              <MoodPreview name={moodName} color={sharedMoodColor} />
              <FormSection
                name={moodName}
                setName={setMoodName}
                sharedColor={sharedMoodColor}
              />
              <SuccessButton
                name={moodName}
                color={moodColor}
                onPress={handlePress}
              />
            </YStack>
          </KeyboardAvoidingView>
        </StepProgressProvider>
      </ViewContainer>
    </AnimatedEntry>
  )
}
