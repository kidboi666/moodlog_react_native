import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { MoodSelectTitle } from '@/core/components/features/write/MoodSelectTitle'
import { NextButton } from '@/core/components/features/write/NextButton'
import { PickerMood } from '@/core/components/features/write/PickerMood'
import { SelectedMoodContainer } from '@/core/components/features/write/SelectedMoodContainer'
import { FadeIn } from '@/core/components/shared/FadeIn.styleable'
import { ROUTE_DELAY_MS } from '@/core/constants/time'
import { useUI } from '@/core/store/ui.store'
import type { Mood, MoodLevel, MoodType } from '@/types/mood.types'
import * as S from './SelectMoodModal.styled'

interface Props {
  hideBottomSheet: () => void
}

export const SelectMoodModal = ({ hideBottomSheet }: Props) => {
  const [mood, setMood] = useState<Mood>()
  const router = useRouter()
  const setNavigating = useUI(state => state.setNavigating)

  const handleMoodChange = useCallback((type: MoodType, level: MoodLevel) => {
    setMood({ type, level })
  }, [])

  const handlePress = useCallback(() => {
    if (!mood) return null

    hideBottomSheet()
    setNavigating(true)

    const timer = setTimeout(() => {
      router.push({
        pathname: '/write',
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
  }, [mood, router, hideBottomSheet, setNavigating])

  const isSelected = !!(!!mood?.type && mood?.level)

  return (
    <S.BottomSheetContainer>
      <S.YStackContainer>
        <FadeIn>
          <MoodSelectTitle />
        </FadeIn>

        <FadeIn>
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
          />
        </FadeIn>

        <NextButton isSelected={isSelected} onPress={handlePress} />
      </S.YStackContainer>
    </S.BottomSheetContainer>
  )
}
