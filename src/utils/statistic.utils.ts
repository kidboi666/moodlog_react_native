import type {
  ISODateString,
  ISOMonthString,
  Journal,
  Moods,
  ScoreBoard,
  SignatureMood,
} from '@/types'
import { MoodLevel, TimeRange } from '@/types'
import { getDayFromISODate, getISOMonthString } from './date.utils'

/**
 * 각 달마다 작성한 일기의 갯수 가져오기
 */
export function getMonthlyCounts(selectedYear: number) {
  // return Object.fromEntries(
  //   Array.from({ length: 12 }, (_, i) => {
  //     const monthString = getISOMonthString(selectedYear, i + 1)
  //     const monthData = monthIndexes[monthString] || []
  //     return [monthString, monthData.length]
  //   }),
  // )
}

/**
 * 가장 많은 일기를 작성한 달과 갯수 가져오기
 */
export function getExpressiveMonth(selectedYear: number) {
  // const monthlyCounts = getMonthlyCounts(selectedYear)
  // return Object.entries(monthlyCounts).reduce(
  //   (highest, [month, count]) => {
  //     if (count > highest.count) {
  //       return { month, count }
  //     }
  //     return highest
  //   },
  //   { month: '', count: 0 },
  // )
}

/**
 * 감정 평균 구하기
 */
export function calculateMoodScoreBoard(
  journals: Journal[],
  moods: Moods,
): ScoreBoard {
  const journalMoods = journals
    .filter(journal => journal?.mood != null)
    .map(journal => journal.mood)
  const myMoods = journalMoods
    .filter(mood => mood?.id && moods?.[mood.id])
    .map(mood => ({
      id: moods[mood.id]?.id || mood.id,
      name: mood.id,
      color: moods[mood.id]?.color || '#ccc',
      level: mood.level || MoodLevel.ZERO,
    }))
  // 나만의 감정별로 count와 score 집계
  const myScoreBoard: ScoreBoard = {}

  myMoods.forEach(mood => {
    if (!mood || !mood.id) return
    const moodId = mood.id
    // 해당 감정이 없으면 초기화
    if (!myScoreBoard[moodId]) {
      myScoreBoard[moodId] = {
        count: 0,
        score: 0,
      }
    }
    const levelScores: Record<string, number> = {
      [MoodLevel.ZERO]: 1,
      [MoodLevel.HALF]: 2,
      [MoodLevel.FULL]: 3,
    }
    const score = levelScores[mood.level] || 0
    // 해당 감정의 count와 score 업데이트
    myScoreBoard[moodId] = {
      count: myScoreBoard[moodId].count + 1,
      score: myScoreBoard[moodId].score + score,
    }
  })

  return myScoreBoard
}

/**
 * 대표 감정 가져오기
 */
export function getSignatureMood(scoreBoard: ScoreBoard): SignatureMood {
  const initialValue: SignatureMood = {
    id: '',
    count: 0,
    score: 0,
  }
  return Object.entries(scoreBoard).reduce((highest, [id, data]) => {
    if (!data) return highest
    if (!highest.id || data.score > highest.score) {
      return {
        id,
        count: data.count,
        score: data.score,
      }
    }
    return highest
  }, initialValue)
}

/**
 * 작성 빈도를 구하기 위해 필요한 date 가져오기
 */
export function getISODateStringForFrequency(
  timeRange: TimeRange,
  selectedTimeUnit: number | ISOMonthString,
) {
  // let dates: string[]
  // if (timeRange === TimeRange.MONTHLY) {
  //   const dateKeys = CommonUtils.extractKeys(indexes.byDate)
  //   dates = dateKeys.flatMap(date =>
  //     date.startsWith(selectedTimeUnit as ISOMonthString)
  //       ? [date as ISODateString]
  //       : [],
  //   )
  // } else {
  //   const dateKeys = CommonUtils.extractKeys(indexes.byDate)
  //   dates = dateKeys.flatMap(date =>
  //     date.startsWith(selectedTimeUnit.toString())
  //       ? [date as ISODateString]
  //       : [],
  //   )
  // }
  // return dates.sort((a, b) => a.localeCompare(b))
}

/**
 * 일기 작성 빈도 가져오기
 */
export function getJournalFrequency(
  timeRange: TimeRange,
  selectedTimeUnit: number | ISOMonthString,
) {
  // const dates = getISODateStringForFrequency(
  //   indexes,
  //   timeRange,
  //   selectedTimeUnit,
  // )
  // const frequency: Record<string, number> = {}
  // if (dates.length === 0) return 0
  // dates.reduce((acc, date) => {
  //   const diffNum = getDaysBetweenDates(date, acc)
  //   if (diffNum !== 0) {
  //     frequency[diffNum] = (frequency[diffNum] || 0) + 1
  //   }
  //   return date
  // }, dates[0])
  // if (Object.keys(frequency).length === 0) return 0
  // return Number(
  //   Object.entries(frequency).reduce(
  //     (acc, [num, count]) => (count > frequency[acc] ? num : acc),
  //     Object.keys(frequency)[0],
  //   ),
  // )
}

/**
 * 가장 자주 일기를 작성한 요일 가져오기
 */
export function getMostActiveDay(journals: Record<string, Journal>) {
  const isArray = Array.isArray(journals)
  if (
    (isArray && journals.length === 0) ||
    (!isArray && Object.keys(journals).length === 0)
  ) {
    return ''
  }
  const castJournals = isArray ? journals : castArray(journals)
  const days = castJournals.map((journal: Journal) =>
    getDayFromISODate(journal.localDate),
  )
  const frequency: Record<string, number> = {}
  days.forEach((day: string) => {
    frequency[day] = (frequency[day] || 0) + 1
  })
  return Object.entries(frequency).reduce(
    (acc, [day, count]) => (count > frequency[acc] ? day : acc),
    Object.keys(frequency)[0],
  )
}

/**
 * 연간 통계 계산
 */
export function getYearlyStats(
  moods: Moods,
  timeRange: TimeRange,
  selectedYear: number,
) {
  // const { journals, indexes } = journalStore
  // const yearIds = indexes.byYear[selectedYear] || []
  // const yearlyJournals = yearIds
  //   .map(id => journals[id])
  //   .filter(journal => journal !== undefined)
  // const expressiveMonth = getExpressiveMonth(
  //   indexes.byMonth,
  //   selectedYear,
  // )
  // const scoreBoard = calculateMoodScoreBoard(
  //   yearlyJournals,
  //   moods,
  // )
  // return {
  //   totalCount: yearlyJournals.length,
  //   frequency: getJournalFrequency(
  //     indexes,
  //     timeRange,
  //     selectedYear,
  //   ),
  //   activeDay: getMostActiveDay(journals),
  //   moodStats: {
  //     scoreBoard,
  //     signatureMood: getSignatureMood(scoreBoard),
  //   },
  //   expressiveMonth: {
  //     month: expressiveMonth.month as ISOMonthString,
  //     count: expressiveMonth.count,
  //   },
  // }
}

/**
 * 월간 통계 계산
 */
export function getMonthlyStats(
  moods: Moods,
  timeRange: TimeRange,
  selectedMonth: ISOMonthString,
) {
  // const { journals, indexes } = journalStore
  // const monthIds = indexes.byMonth[selectedMonth] || []
  // const monthlyJournals = monthIds
  //   .map(id => journals[id])
  //   .filter(journal => journal !== undefined)
  // const scoreBoard = calculateMoodScoreBoard(
  //   monthlyJournals,
  //   moods,
  // )
  // return {
  //   totalCount: monthlyJournals.length,
  //   frequency: getJournalFrequency(
  //     indexes,
  //     timeRange,
  //     selectedMonth,
  //   ),
  //   activeDay: getMostActiveDay(journals),
  //   moodStats: {
  //     scoreBoard,
  //     signatureMood: getSignatureMood(scoreBoard),
  //   },
  //   expressiveMonth: {
  //     month: '0000-00' as ISOMonthString,
  //     count: 0,
  //   },
  // }
}

/**
 * 주간 통계 계산
 */
export function getWeeklyStats(selectedDate: ISODateString) {
  //   const { journals, indexes } = journalStore
  //   const dates = getThisWeekArray(selectedDate)
  //   return Object.keys(WEEK_DAY).reduce(
  //     (scoreBoard, day, index) => {
  //       const date = dates[index]
  //       const ids = indexes.byDate[date] || []
  //       const dayJournal = ids.map(id => journals[id]).filter(Boolean)
  //
  //       scoreBoard[day] = dayJournal.length > 0 ? dayJournal[0].mood : null
  //       return scoreBoard
  //     },
  //     {} as Record<string, JournalMood | null>,
  //   )
}
