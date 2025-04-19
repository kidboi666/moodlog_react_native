import { WEEK_DAY } from '@/constants'
import {
  EmotionDisplayType,
  type Mood,
  MoodLevel,
  MoodType,
  type SignatureMood,
  TimeRange,
} from '@/types'
import type {
  ISODateString,
  ISOMonthString,
  Journal,
  JournalIndexes,
  Journals,
  MonthIndexes,
  ScoreBoard,
} from '@/types'
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
  static calculateMoodScoreBoard(
    journals: Journal[],
    emotionDisplayType?: EmotionDisplayType,
  ): ScoreBoard {
    const moods = journals.map(journal => journal.mood)

    // 5단계 좋음/나쁨 감정 표현 방식인 경우
    if (emotionDisplayType === EmotionDisplayType.FIVE_LEVELS_GOOD_BAD) {
      // 5단계 좋음/나쁨에서는 simple 타입만 사용
      const simpleScoreBoard = {
        simple: { count: 0, score: 0 },
      } as unknown as ScoreBoard

      moods.forEach(mood => {
        if (!mood || !mood.type) return

        if (mood.type === MoodType.SIMPLE) {
          // 5단계 좋음/나쁨의 레벨은 문자열로 1-5까지의 값을 가짐
          const level = Number.parseInt(mood.level || '0', 10)

          if (simpleScoreBoard.simple) {
            simpleScoreBoard.simple = {
              count: simpleScoreBoard.simple.count + 1,
              score: simpleScoreBoard.simple.score + level,
            }
          }
        }
      })

      return simpleScoreBoard
    }

    // 사용자 정의 감정 표현 방식인 경우
    if (emotionDisplayType === EmotionDisplayType.MY_EMOTIONS) {
      const myScoreBoard: ScoreBoard = {
        my: { count: 0, score: 0 },
      }

      // 나만의 감정별로 count와 score 집계
      moods.forEach(mood => {
        if (!mood || !mood.type) return

        if (mood.type === MoodType.MY && mood.myId) {
          // myId를 키로 사용
          const myId = mood.myId

          // 해당 감정이 없으면 초기화
          if (!myScoreBoard[myId]) {
            myScoreBoard[myId] = { count: 0, score: 0 }
          }

          const levelScores = {
            [MoodLevel.ZERO]: 1,
            [MoodLevel.HALF]: 2,
            [MoodLevel.FULL]: 3,
          }

          const score = levelScores[mood.level] || 0

          // 해당 감정의 count와 score 업데이트
          if (myScoreBoard[myId]) {
            myScoreBoard[myId] = {
              count: (myScoreBoard[myId]?.count || 0) + 1,
              score: (myScoreBoard[myId]?.score || 0) + score,
            }
          }

          // 전체 my 카테고리 집계에도 추가
          if (myScoreBoard.my) {
            myScoreBoard.my = {
              count: myScoreBoard.my.count + 1,
              score: myScoreBoard.my.score + score,
            }
          }
        }
      })

      return myScoreBoard
    }

    // 5단계 좋음/나쁨 방식만 남김
    return {}
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
    emotionDisplaySettings: Record<string, EmotionDisplayType>,
    month: ISOMonthString,
  ): EmotionDisplayType | undefined {
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
    emotionDisplayType?: EmotionDisplayType,
    emotionDisplaySettings?: Record<string, EmotionDisplayType>,
  ) {
    const yearIds = indexes.byYear[selectedYear] || []
    const yearlyJournals = yearIds
      .map(id => journals[id])
      .filter(journal => journal !== undefined)

    const expressiveMonth = Statistics.getExpressiveMonth(
      indexes.byMonth,
      selectedYear,
    )
    const scoreBoard = Statistics.calculateMoodScoreBoard(
      yearlyJournals,
      emotionDisplayType,
    )

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
    emotionDisplayType?: EmotionDisplayType,
    emotionDisplaySettings?: Record<string, EmotionDisplayType>,
  ) {
    const monthIds = indexes.byMonth[selectedMonth] || []
    const monthlyJournals = monthIds
      .map(id => journals[id])
      .filter(journal => journal !== undefined)

    // 선택된 달에 특정 감정 선택 로직이 설정되어 있으면 그것을 사용
    const monthDisplayType = emotionDisplaySettings?.[selectedMonth]
      ? emotionDisplaySettings[selectedMonth]
      : emotionDisplayType

    const scoreBoard = Statistics.calculateMoodScoreBoard(
      monthlyJournals,
      monthDisplayType,
    )

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
   * 주간 통계 계산
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
      {} as Record<string, Mood | null>,
    )
  }
}
