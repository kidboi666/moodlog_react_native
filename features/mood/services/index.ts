import {
  JournalMood,
  Mood,
  MoodLevel,
  Moods,
  type Nullable,
} from '@/shared/types'

export const MoodService = {
  addMood: (moods: Moods, newMood: Mood): Moods => {
    if (moods[newMood.name]) {
      throw new Error('Mood already exists')
    }

    return {
      ...moods,
      [newMood.id]: newMood,
    }
  },

  updateMood: (moods: Moods, newMood: Mood): Moods => {
    moods[newMood.id] = newMood
    return moods
  },

  removeMood: (moods: Moods, moodId: string): Moods => {
    const newMoods = { ...moods }
    delete newMoods[moodId]
    return newMoods
  },

  getRemainingMoodCount: (moods: Moods, moodLimit: number): number => {
    return Math.max(0, Object.keys(moods).length - moodLimit)
  },

  calculateMoodColor: (moods: Nullable<JournalMood[]>) => {
    if (!moods || moods.length === 0) return null

    // 감정 ID별 점수 집계를 위한 객체
    const scoreBoard: Record<string, number> = {}

    moods.forEach((mood: JournalMood) => {
      if (!mood.name) return

      const scoreMap = {
        [MoodLevel.FULL]: 3,
        [MoodLevel.HALF]: 2,
        [MoodLevel.ZERO]: 1,
      }

      if (!scoreBoard[mood.name]) {
        scoreBoard[mood.name] = 0
      }

      scoreBoard[mood.name] += scoreMap[mood.level] || 0
    })

    let maxName = ''
    let maxScore = -1

    for (const [id, score] of Object.entries(scoreBoard)) {
      if (score > maxScore) {
        maxScore = score
        maxName = id
      }
    }

    // 가장 많이 사용된 감정의 색상 반환
    return moods.find(mood => mood.name === maxName)?.color || null
  },
}
