import {
  ISODateString,
  type ISOMonthString,
  Journal,
  JournalMood,
  type Maybe,
  MoodLevel,
} from '@/types'
import { hexToRgba } from './common.utils'
import { getISODateFromMonthString } from './date.utils'

/**
 * 가장 점수가 높은 mood 반환
 */
export function calculateSignatureJournalMood(moods: Maybe<JournalMood[]>) {
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

export function paintMood(date: ISODateString, journals?: Journal[]) {
  const dateJournals =
    journals?.filter(journal => journal.localDate === date) ?? []
  const journalMoods = dateJournals?.map(
    journal =>
      ({
        ...journal.mood,
        level: journal.moodLevel,
      }) as JournalMood,
  )
  if (journalMoods.length === 0) return 'isEmpty'
  const signatureMood = calculateSignatureJournalMood(journalMoods)
  if (!signatureMood) return null
  switch (signatureMood?.level) {
    case MoodLevel.HALF:
      return hexToRgba(signatureMood.color, 0.7)
    case MoodLevel.ZERO:
      return hexToRgba(signatureMood.color, 0.4)
    default:
      return hexToRgba(signatureMood.color, 1)
  }
}

/**
 * 잔디밭 그리기
 */
export function getGardenMoodData(
  weekLength: number,
  firstDateDay: number,
  monthDate: ISOMonthString,
  lastDate: number,
  journals?: Journal[],
) {
  const data = []
  for (let week = 0; week < weekLength; week++) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const dateNum = week * 7 + day - firstDateDay + 1
      if (dateNum <= 0 || dateNum > lastDate) {
        weekData.push(null)
      } else {
        const dateString = getISODateFromMonthString(monthDate, dateNum)
        weekData.push(paintMood(dateString, journals))
      }
    }
    data.push(weekData)
  }
  return data
}
