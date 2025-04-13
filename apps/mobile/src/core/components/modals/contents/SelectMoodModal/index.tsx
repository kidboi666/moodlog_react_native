import { useCallback, useState } from 'react'
import { useRouter } from 'expo-router'

import { MoodSelectTitle } from '@/core/components/features/write/MoodSelectTitle'
import { NextButton } from '@/core/components/features/write/NextButton'
import { PickerMood } from '@/core/components/features/write/PickerMood'
import { SelectedMoodContainer } from '@/core/components/features/write/SelectedMoodContainer'
import { FadeIn } from '@/core/components/shared/FadeIn.styleable'
import { ROUTE_DELAY_MS } from '@/core/constants/time'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import type { Mood, MoodLevel, MoodType } from '@/types/mood.types'
import * as S from './SelectMoodModal.styled'

interface Props {
  onPress: (mood: Mood) => void
}

export const SelectMoodModal = ({ onPress  }: Props) => {
  const [mood, setMood] = useState<Mood>()
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const router = useRouter()

  const handleMoodChange = useCallback((type: MoodType, level: MoodLevel) => {
    setMood({ type, level })
  }, [])

  const handlePress = useCallback(() => {
    if (!mood) return null
    const timer = setTimeout(() => {
      router.push({
        pathname: '/write',
        params: {
          moodType: mood.type,
          moodLevel: mood.level,
        },
      })
    }, ROUTE_DELAY_MS)
    
    hideBottomSheet()
    return () => clearTimeout(timer)
  }, [onPress, mood])

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
