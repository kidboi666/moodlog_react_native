import { memo, useMemo } from 'react'
import { GetThemeValueForKey, View, styled } from 'tamagui'

import { MoodUtils } from '@/features/mood/utils'
import { useMood } from '@/shared/store'
import { JournalMood, Nullable } from '@/shared/types'

interface Props {
  mood: Nullable<JournalMood[]>
  isEmpty?: boolean
}

export const Grass = memo(
  ({ mood, isEmpty = false }: Props) => {
    const moods = useMood(state => state.moods)

    if (isEmpty && !mood) {
      return <StyledGrass />
    }

    const signatureMood = useMemo(
      () => MoodUtils.calculateSignatureJournalMood(mood),
      [mood, isEmpty],
    )
    let moodColor: string | undefined

    if (signatureMood) {
      moodColor = MoodUtils.paintMood(moods, signatureMood)
    }

    return (
      <StyledGrass
        bg={(moodColor as GetThemeValueForKey<'backgroundColor'>) || '$gray10'}
      />
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.isEmpty !== nextProps.isEmpty) return false
    if (!prevProps.mood && !nextProps.mood) return true
    if (!prevProps.mood || !nextProps.mood) return false
    return prevProps.mood.length === nextProps.mood.length
  },
)

const StyledGrass = styled(View, {
  width: 16,
  height: 16,
  rounded: '$1',
})

Grass.displayName = 'Grass'
