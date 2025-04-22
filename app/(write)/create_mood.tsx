import { useToastController } from '@tamagui/toast'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarUtils } from 'react-native-calendars'
import { useSharedValue } from 'react-native-reanimated'
import { YStack } from 'tamagui'

import { ROUTE_DELAY_MS } from '@/constants'
import { useApp, useJournal, useUI } from '@/store'

import {
  FormSection,
  MoodPreview,
  SuccessButton,
} from '@/components/features/write'
import { AnimatedEntry, ViewContainer } from '@/components/shared'

export default function CreateMoodScreen() {
  const router = useRouter()
  const toast = useToastController()
  const { t } = useTranslation()
  const [moodName, setMoodName] = useState('')
  const [moodColor, setMoodColor] = useState('')
  const sharedMoodColor = useSharedValue('#000000')

  const addMyMood = useApp(state => state.addMyMood)
  const setNavigating = useUI(state => state.setNavigating)
  const getMoodForDate = useJournal(state => state.getMoodForDate)

  useEffect(() => {
    const todayDate = CalendarUtils.getCalendarDateString(new Date())
    const todayMoods = getMoodForDate(todayDate)

    if (todayMoods && todayMoods.length > 0) {
      const todayMood = todayMoods[0]
      setMoodName(todayMood)

      toast.show(t('notifications.warning.moodLimit.title'), {
        message: t('notifications.warning.moodLimit.message'),
        preset: 'notice',
      })
    }
  }, [getMoodForDate, toast, t])

  const handlePress = useCallback(() => {
    if (!moodName || !moodColor) setNavigating(true)
    addMyMood({
      id: Crypto.randomUUID(),
      name: moodName,
      color: moodColor,
      createdAt: new Date().toISOString(),
    })
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
      </ViewContainer>
    </AnimatedEntry>
  )
}
