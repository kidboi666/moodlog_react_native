import { WEEK_DAY } from '@/constants'
import type {
  ISODateString,
  ISOMonthString,
  Journal,
  JournalIndexes,
  JournalMood,
  Journals,
  MonthIndexes,
  ScoreBoard,
  SignatureMood,
} from '@/types'
import { MoodLevel, TimeRange } from '@/types'
import {
  castArray,
  extractKeys,
  getDayFromISODate,
  getDaysBetweenDates,
  getISOMonthString,
  getThisWeekArray,
} from '@/utils'

export class Statistics {
  /**
   * 각 달마다 작성한 일기의 갯수 가져오기
   */
  static getMonthlyCounts(
    monthIndexes: MonthIndexes,
    selectedYear: number,
  ): Record<string, number> {
    return Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => {
        const monthString = getISOMonthString(selectedYear, i + 1)
        const monthData = monthIndexes[monthString] || []
        return [monthString, monthData.length]
      }),
    )
  }

  /**
   * 가장 많은 일기를 작성한 달과 갯수 가져오기
   */
  static getExpressiveMonth(monthIndexes: MonthIndexes, selectedYear: number) {
    const monthlyCounts = Statistics.getMonthlyCounts(
      monthIndexes,
      selectedYear,
    )
    return Object.entries(monthlyCounts).reduce(
      (highest, [month, count]) => {
        if (count > highest.count) {
          return { month, count }
        }
        return highest
      },
      { month: '', count: 0 },
    )
  }

  /**
   * 감정 평균 구하기
   */
  static calculateMoodScoreBoard(journals: Journal[]): ScoreBoard {
    const moods = journals.map(journal => journal.mood)

    // 나만의 감정별로 count와 score 집계
    const myScoreBoard: ScoreBoard = {}

    moods.forEach(mood => {
      if (!mood || !mood.id) return

      // 감정 ID를 키로 사용
      const moodId = mood.id

      // 해당 감정이 없으면 초기화
      if (!myScoreBoard[moodId]) {
        myScoreBoard[moodId] = {
          count: 0,
          score: 0,
          color: mood.color,
        }
      }

      const levelScores = {
        [MoodLevel.ZERO]: 1,
        [MoodLevel.HALF]: 2,
        [MoodLevel.FULL]: 3,
      }

      const score = levelScores[mood.level] || 0

      // 해당 감정의 count와 score 업데이트
      myScoreBoard[moodId] = {
        count: (myScoreBoard[moodId]?.count || 0) + 1,
        score: (myScoreBoard[moodId]?.score || 0) + score,
        color: mood.color,
      }
    })

    return myScoreBoard
  }

  /**
   * 대표 감정 가져오기
   */
  static getSignatureMood(scoreBoard: ScoreBoard): SignatureMood {
    const initialValue: SignatureMood = {
      type: '',
      count: 0,
      score: 0,
    }
    return Object.entries(scoreBoard).reduce((highest, [type, data]) => {
      if (!data) return highest

      if (!highest.type || data.score > highest.score) {
        return {
          type,
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
  static getISODateStringForFrequency(
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedTimeUnit: number | ISOMonthString,
  ) {
    let dates: string[]

    if (timeRange === TimeRange.MONTHLY) {
      const dateKeys = extractKeys(indexes.byDate)
      dates = dateKeys.flatMap(date =>
        date.startsWith(selectedTimeUnit as ISOMonthString)
          ? [date as ISODateString]
          : [],
      )
    } else {
      const dateKeys = extractKeys(indexes.byDate)
      dates = dateKeys.flatMap(date =>
        date.startsWith(selectedTimeUnit.toString())
          ? [date as ISODateString]
          : [],
      )
    }

    return dates.sort((a, b) => a.localeCompare(b))
  }

  /**
   * 일기 작성 빈도 가져오기
   */
  static getJournalFrequency(
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedTimeUnit: number | ISOMonthString,
  ): number {
    const dates = Statistics.getISODateStringForFrequency(
      indexes,
      timeRange,
      selectedTimeUnit,
    )
    const frequency: Record<string, number> = {}

    if (dates.length === 0) return 0

    dates.reduce((acc, date) => {
      const diffNum = getDaysBetweenDates(date, acc)
      if (diffNum !== 0) {
        frequency[diffNum] = (frequency[diffNum] || 0) + 1
      }
      return date
    }, dates[0])

    if (Object.keys(frequency).length === 0) return 0

    return Number.parseInt(
      Object.entries(frequency).reduce(
        (acc, [num, count]) => (count > frequency[acc] ? num : acc),
        Object.keys(frequency)[0],
      ),
    )
  }

  /**
   * 가장 자주 일기를 작성한 요일 가져오기
   */
  static getMostActiveDay(journals: Journals): string {
    const isArray = Array.isArray(journals)
    if (
      (isArray && journals.length === 0) ||
      (!isArray && Object.keys(journals).length === 0)
    ) {
      return ''
    }
    const castJournals = isArray ? journals : castArray(journals)

    const days = castJournals.map(journal =>
      getDayFromISODate(journal.localDate),
    )
    const frequency: Record<string, number> = {}

    days.forEach(day => {
      frequency[day] = (frequency[day] || 0) + 1
    })

    return Object.entries(frequency).reduce(
      (acc, [day, count]) => (count > frequency[acc] ? day : acc),
      Object.keys(frequency)[0],
    )
  }

  /**
   * 월별 감정 선택 로직 정보 저장하기
   */
  static getEmotionDisplayTypeByMonth(
    emotionDisplaySettings: Record<string, any>,
    month: ISOMonthString,
  ): any | undefined {
    return emotionDisplaySettings?.[month]
  }

  /**
   * 연간 통계 계산
   */
  static getYearlyStats(
    journals: Journals,
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedYear: number,
  ) {
    const yearIds = indexes.byYear[selectedYear] || []
    const yearlyJournals = yearIds
      .map(id => journals[id])
      .filter(journal => journal !== undefined)

    const expressiveMonth = Statistics.getExpressiveMonth(
      indexes.byMonth,
      selectedYear,
    )
    const scoreBoard = Statistics.calculateMoodScoreBoard(yearlyJournals)

    return {
      totalCount: yearlyJournals.length,
      frequency: Statistics.getJournalFrequency(
        indexes,
        timeRange,
        selectedYear,
      ),
      activeDay: Statistics.getMostActiveDay(journals),
      moodStats: {
        scoreBoard,
        signatureMood: Statistics.getSignatureMood(scoreBoard),
      },
      expressiveMonth: {
        month: expressiveMonth.month as ISOMonthString,
        count: expressiveMonth.count,
      },
    }
  }

  /**
   * 월간 통계 계산
   */
  static getMonthlyStats(
    journals: Journals,
    indexes: JournalIndexes,
    timeRange: TimeRange,
    selectedMonth: ISOMonthString,
  ) {
    const monthIds = indexes.byMonth[selectedMonth] || []
    const monthlyJournals = monthIds
      .map(id => journals[id])
      .filter(journal => journal !== undefined)

    const scoreBoard = Statistics.calculateMoodScoreBoard(monthlyJournals)

    return {
      totalCount: monthlyJournals.length,
      frequency: Statistics.getJournalFrequency(
        indexes,
        timeRange,
        selectedMonth,
      ),
      activeDay: Statistics.getMostActiveDay(journals),
      moodStats: {
        scoreBoard,
        signatureMood: Statistics.getSignatureMood(scoreBoard),
      },
      expressiveMonth: {
        month: '0000-00' as ISOMonthString,
        count: 0,
      },
    }
  }

  /**
   * 월간 통계 계산
   */
  static getWeeklyStats(
    journals: Journals,
    indexes: JournalIndexes,
    selectedDate: ISODateString,
  ) {
    const dates = getThisWeekArray(selectedDate)

    return Object.keys(WEEK_DAY).reduce(
      (scoreBoard, day, index) => {
        const date = dates[index]
        const ids = indexes.byDate[date] || []
        const dayJournal = ids.map(id => journals[id]).filter(Boolean)

        scoreBoard[day] = dayJournal.length > 0 ? dayJournal[0].mood : null
        return scoreBoard
      },
      {} as Record<string, JournalMood | null>,
    )
  }
}
