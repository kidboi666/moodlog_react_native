import { JournalMood, MoodLevel, Moods, type Nullable } from '@/shared/types'
import { hexToRgba } from '@/shared/utils'

export class MoodUtils {
  static calculateSignatureJournalMood(moods: Nullable<JournalMood[]>) {
    if (!moods || moods.length === 0) return null

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

    return moods.find(mood => mood.id === maxId) || null
  }

  static paintMood(moods: Moods, journalMood: JournalMood | string) {
    if (typeof journalMood === 'string') {
      return moods[journalMood].color
    }

    const { id, level } = journalMood
    const moodColor = moods[id].color

    switch (level) {
      case MoodLevel.HALF: {
        return hexToRgba(moodColor, 0.7)
      }
      case MoodLevel.ZERO: {
        return hexToRgba(moodColor, 0.4)
      }
      default:
        return hexToRgba(moodColor, 1)
    }
  }
}
