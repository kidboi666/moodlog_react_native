import {
  ISODateString,
  type ISOMonthString,
  Journal,
  JournalMood,
  type Maybe,
  MoodLevel,
} from '@/types'
import { CommonUtils } from './common.utils'
import { DateUtils } from './date.utils'

export class MoodUtils {
  /**
   * 가장 점수가 높은 mood 반환
   */
  static calculateSignatureJournalMood(moods: Maybe<JournalMood[]>) {
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

  static paintMood(journals: Journal[], date: ISODateString) {
    const dateJournals = journals.filter(journal => journal.localDate === date)
    const journalMoods = dateJournals.map(
      journal =>
        ({
          ...journal.mood,
          level: journal.moodLevel,
        }) as JournalMood,
    )
    const signatureMood = MoodUtils.calculateSignatureJournalMood(journalMoods)
    if (!signatureMood) return null

    switch (signatureMood?.level) {
      case MoodLevel.HALF:
        return CommonUtils.hexToRgba(signatureMood.color, 0.7)
      case MoodLevel.ZERO:
        return CommonUtils.hexToRgba(signatureMood.color, 0.4)
      default:
        return CommonUtils.hexToRgba(signatureMood.color, 1)
    }
  }

  /**
   * 잔디밭 그리기
   */
  static getGardenMoodData(
    journals: Journal[],
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
          weekData.push(MoodUtils.paintMood(journals, dateString))
        }
      }
      data.push(weekData)
    }
    return data
  }
}
