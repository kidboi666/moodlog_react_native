import { memo, useMemo } from 'react'
import { View, styled } from 'tamagui'

import { useMood } from '@/store'
import { JournalMood, Maybe } from '@/types'
import { CommonUtils, MoodUtils } from '@/utils'

interface Props {
  mood: Maybe<JournalMood[]>
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
    let moodColor: Maybe<string>

    if (signatureMood && !CommonUtils.isEmptyObj(moods)) {
      moodColor = MoodUtils.paintMood(moods, signatureMood)
    }

    return <StyledGrass moodColor={moodColor || '$color9'} />
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
  variants: {
    moodColor: {
      ':string': bg => ({ bg }),
    },
  },
})

Grass.displayName = 'Grass'
