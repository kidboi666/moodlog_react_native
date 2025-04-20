import { memo, useMemo } from 'react'

import type { Nullable } from '@/types'
import { JournalMood, MoodLevel } from '@/types'

import * as S from '@/components/features/entries/Grass.styled'

const calculateMoodColor = (moods: Nullable<JournalMood[]>) => {
  if (!moods || moods.length === 0) return null

  // 감정 ID별 점수 집계를 위한 객체
  const scoreBoard: Record<string, number> = {}

  moods.forEach((mood: JournalMood) => {
    if (!mood.id) return

    const scoreMap = {
      [MoodLevel.FULL]: 3,
      [MoodLevel.HALF]: 2,
      [MoodLevel.ZERO]: 1,
    }

    if (!scoreBoard[mood.id]) {
      scoreBoard[mood.id] = 0
    }

    scoreBoard[mood.id] += scoreMap[mood.level] || 0
  })

  let maxId = ''
  let maxScore = -1

  for (const [id, score] of Object.entries(scoreBoard)) {
    if (score > maxScore) {
      maxScore = score
      maxId = id
    }
  }

  // 가장 많이 사용된 감정의 색상 반환
  return moods.find(mood => mood.id === maxId)?.color || null
}

interface Props {
  mood: Nullable<JournalMood[]>
  isEmpty?: boolean
}

export const Grass = memo(
  ({ mood, isEmpty = false }: Props) => {
    if (isEmpty && !mood) {
      return <S.Grass />
    }

    const moodColor = useMemo(() => calculateMoodColor(mood), [mood, isEmpty])

    return <S.Grass moodColor={moodColor || '$gray10'} />
  },
  (prevProps, nextProps) => {
    if (prevProps.isEmpty !== nextProps.isEmpty) return false
    if (!prevProps.mood && !nextProps.mood) return true
    if (!prevProps.mood || !nextProps.mood) return false
    return prevProps.mood.length === nextProps.mood.length
  },
)
