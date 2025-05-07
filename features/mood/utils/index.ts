import { JournalUtils } from '@/features/journal/utils'
import {
  type ISOMonthString,
  JournalMood,
  JournalStore,
  Mood,
  MoodLevel,
  type Nullable,
} from '@/shared/types'
import { DateUtils, hexToRgba } from '@/shared/utils'

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

  static paintMood(moods: Mood[], journalMood: JournalMood | string) {
    if (typeof journalMood === 'string') {
      return moods.find(m => m.id === journalMood)?.color
    }

    const { id, level } = journalMood

    if (!id) {
      return null
    }

    const moodColor = moods.find(m => m.id === id)?.color

    if (!moodColor) {
      return null
    }

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

  static getGardenMoodData(
    store: JournalStore,
    weekLength: number,
    firstDateDay: number,
    monthDate: ISOMonthString,
    lastDate: number,
  ) {
    const data = []

    for (let week = 0; week < weekLength; week++) {
      const weekData = []
      for (let day = 0; day < 7; day++) {
        const dateNum = week * 7 + day - firstDateDay + 1
        if (dateNum <= 0 || dateNum > lastDate) {
          weekData.push(null)
        } else {
          const dateString = DateUtils.getISODateFromMonthString(
            monthDate,
            dateNum,
          )
          weekData.push(JournalUtils.getMoodForDate(store, dateString))
        }
      }
      data.push(weekData)
    }
    return data
  }
}
