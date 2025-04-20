import { useToastController } from '@tamagui/toast'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarUtils } from 'react-native-calendars'
import { View, YStack } from 'tamagui'

import { ROUTE_DELAY_MS } from '@/constants'
import { useApp, useJournal, useUI } from '@/store'
import { MoodLevel } from '@/types'

import { MoodColorForm } from '@/components/features/write/MoodColorForm'
import { MoodLevelForm } from '@/components/features/write/MoodLevelForm'
import { MoodNameForm } from '@/components/features/write/MoodNameForm'
import { SuccessButton } from '@/components/features/write/SuccessButton'
import { FadeIn } from '@/components/shared/FadeIn'
import { HeaderContent } from '@/components/shared/HeaderContent'
import { ViewContainer } from '@/components/shared/ViewContainer'

export default function Screen() {
  const [moodName, setMoodName] = useState('')
  const [moodColor, setMoodColor] = useState('')
  const [moodLevel, setMoodLevel] = useState<MoodLevel>()
  const router = useRouter()
  const toast = useToastController()
  const addMyMood = useApp(state => state.addMyMood)
  const setNavigating = useUI(state => state.setNavigating)
  const getMoodForDate = useJournal(state => state.getMoodForDate)
  const { t } = useTranslation()

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
          moodLevel,
        },
      })

      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [moodName, router, setNavigating])

  return (
    <FadeIn flex={1}>
      <ViewContainer
        edges={['bottom']}
        Header={<HeaderContent leftAction={() => router.back()} />}
      >
        <YStack flex={1} gap='$6'>
          <MoodNameForm moodName={moodName} setMoodName={setMoodName} />
          <MoodColorForm
            moodName={moodName}
            moodColor={moodColor}
            setMoodColor={setMoodColor}
          />
          <MoodLevelForm
            moodName={moodName}
            moodColor={moodColor}
            moodLevel={moodLevel}
            setMoodLevel={setMoodLevel}
          />
          <View flex={1} />
          <SuccessButton
            moodName={moodName}
            moodColor={moodColor}
            moodLevel={moodLevel}
            onPress={handlePress}
          />
        </YStack>
      </ViewContainer>
    </FadeIn>
  )
}
