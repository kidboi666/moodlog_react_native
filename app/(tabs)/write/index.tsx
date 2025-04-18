import { ArrowLeft } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarUtils } from 'react-native-calendars'
import { AnimatePresence } from 'tamagui'

import { ROUTE_DELAY_MS } from '@/constants'
import { useJournal, useUI } from '@/store'
import type { Mood, MoodLevel, MoodType } from '@/types'

import { MoodSelectTitle } from '@/components/features/write/MoodSelectTitle'
import { NextButton } from '@/components/features/write/NextButton'
import { PickerMood } from '@/components/features/write/PickerMood'
import { SelectedMoodContainer } from '@/components/features/write/SelectedMoodContainer'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import * as S from '@/styles/screens/write/SelectMood.styled'

export default function Screen() {
  const [mood, setMood] = useState<Mood>()
  const [hasTodayJournal, setHasTodayJournal] = useState(false)
  const router = useRouter()
  const toast = useToastController()
  const setNavigating = useUI(state => state.setNavigating)
  const getMoodForDate = useJournal(state => state.getMoodForDate)
  const { t } = useTranslation()

  // 오늘 날짜에 이미 작성된 일기가 있는지 확인
  useEffect(() => {
    const todayDate = CalendarUtils.getCalendarDateString(new Date())
    const todayMoods = getMoodForDate(todayDate)

    if (todayMoods && todayMoods.length > 0) {
      // 오늘 이미 작성된 일기가 있으면 첫번째 일기의 감정으로 설정
      const todayMood = todayMoods[0]
      setMood(todayMood)
      setHasTodayJournal(true)

      toast.show(t('notifications.warning.moodLimit.title'), {
        message: t('notifications.warning.moodLimit.message'),
        preset: 'notice',
      })
    }
  }, [getMoodForDate, toast, t])

  const handleMoodChange = useCallback(
    (type: MoodType, level: MoodLevel) => {
      // 이미 오늘 작성된 일기가 있으면 감정 변경 불가
      if (hasTodayJournal) {
        toast.show(t('notifications.warning.moodLimit.title'), {
          message: t('notifications.warning.moodLimit.message'),
          preset: 'notice',
        })
        return
      }

      setMood({ type, level })
    },
    [hasTodayJournal, toast, t],
  )

  const handlePress = useCallback(() => {
    if (!mood) return null

    setNavigating(true)

    const timer = setTimeout(() => {
      router.push({
        pathname: '/write/writing_page',
        params: {
          moodType: mood.type,
          moodLevel: mood.level,
        },
      })

      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [mood, router, setNavigating])

  const isSelected = !!(mood?.type && mood?.level)

  return (
    <S.ViewContainer
      edges={['bottom']}
      Header={
        <S.HeaderContainer>
          <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
        </S.HeaderContainer>
      }
    >
      <S.YStackContainer>
        <FadeIn>
          <MoodSelectTitle />
        </FadeIn>

        <FadeIn flex={1} items='center'>
          <SelectedMoodContainer
            moodType={mood?.type}
            moodLevel={mood?.level}
          />
        </FadeIn>

        <FadeIn>
          <PickerMood
            selectedMoodType={mood?.type}
            selectedMoodLevel={mood?.level}
            onMoodChange={handleMoodChange}
            disabled={hasTodayJournal}
          />
        </FadeIn>

        <S.ButtonContainer>
          <AnimatePresence presenceAffectsLayout>
            {isSelected && (
              <NextButton isSelected={isSelected} onPress={handlePress} />
            )}
          </AnimatePresence>
        </S.ButtonContainer>
      </S.YStackContainer>
    </S.ViewContainer>
  )
}
