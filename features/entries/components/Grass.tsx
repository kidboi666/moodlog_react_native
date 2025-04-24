import { memo, useMemo } from 'react'

import { JournalMood, Nullable } from 'shared/types'

import { MoodService } from 'shared/services'
import { View, styled } from 'tamagui'

export const StyledGrass = styled(View, {
  width: 16,
  height: 16,
  rounded: '$1',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  } as const,
})

interface Props {
  mood: Nullable<JournalMood[]>
  isEmpty?: boolean
}

export const Grass = memo(
  ({ mood, isEmpty = false }: Props) => {
    if (isEmpty && !mood) {
      return <StyledGrass />
    }

    const moodColor = useMemo(
      () => MoodService.calculateMoodColor(mood),
      [mood, isEmpty],
    )

    return <StyledGrass moodColor={moodColor || '$gray10'} />
  },
  (prevProps, nextProps) => {
    if (prevProps.isEmpty !== nextProps.isEmpty) return false
    if (!prevProps.mood && !nextProps.mood) return true
    if (!prevProps.mood || !nextProps.mood) return false
    return prevProps.mood.length === nextProps.mood.length
  },
)
