import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'

import { MoodSelectTitle } from '@/core/components/features/write/MoodSelectTitle'
import { NextButton } from '@/core/components/features/write/NextButton'
import { PickerMood } from '@/core/components/features/write/PickerMood'
import { SelectedMoodContainer } from '@/core/components/features/write/SelectedMoodContainer'
import { WriteHeader } from '@/core/components/features/write/WriteHeader'
import { FadeIn } from '@/core/components/shared/FadeIn.styleable'
import { ROUTE_DELAY_MS } from '@/core/constants/time'
import { useUI } from '@/core/store/ui.store'
import * as S from '@/styles/screens/write/SelectMood.styled'
import type { Mood, MoodLevel, MoodType } from '@/types/mood.types'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { AnimatePresence } from 'tamagui'

export default function Screen() {
  const [mood, setMood] = useState<Mood>()
  const router = useRouter()
  const setNavigating = useUI(state => state.setNavigating)

  const handleMoodChange = useCallback((type: MoodType, level: MoodLevel) => {
    setMood({ type, level })
  }, [])

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
