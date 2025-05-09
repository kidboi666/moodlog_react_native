import { MONTHS, WEEK_DAY } from '@/constants'
import type {
  ISODateString,
  ISOMonthString,
  MonthKey,
  WeekDayValue,
} from '@/types'
import { removeLeadingZero } from './common'

export class DateUtils {
  /**
   * 월 숫자 또는 문자열을 입력받아 해당하는 월 문자열 키를 반환
   */
  static getMonthKey(month: number | string): MonthKey {
    if (typeof month === 'number') {
      return Object.keys(MONTHS)[month] as MonthKey
    }
    if (month.includes('-')) {
      const monthNumber = Number(removeLeadingZero(month.split('-')[1])) - 1
      return Object.keys(MONTHS)[monthNumber] as MonthKey
    }
    return month as MonthKey
  }

  /**
   * ISOMonthDate(YYYY-MM) 와 date 를 받아 ISODate(YYYY-MM-DD) 로 반환
   */
  static getISODateFromMonthString(
    month: ISOMonthString,
    day: number,
  ): ISODateString {
    return `${month}-${day.toString().padStart(2, '0')}` as ISODateString
  }

  /**
   * 년, 월, 일을 받아 ISODate(YYYY-MM-DD) 를 반환
   */
  static getISODateString(
    year: number,
    month: number | string,
    date: number,
  ): ISODateString {
    let monthIndex: number
    if (typeof month === 'string') {
      monthIndex = Object.keys(MONTHS).findIndex(key => key === month)
    } else {
      monthIndex = month
    }
    return `${year}-${monthIndex.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` as ISODateString
  }

  /**
   * ISODate(YYYY-MM-DD) 를 받아 요일 문자열 추출
   */
  static getDayFromISODate(date: ISODateString): WeekDayValue {
    const dayIndex = new Date(date).getDay()
    const day = dayIndex === 0 ? 6 : dayIndex - 1
    return Object.keys(WEEK_DAY)[day] as WeekDayValue
  }

  /**
   * ISODate(YYYY-MM-DD) 를 받아 년도 추출
   */
  static getYearFromISODate(date: ISODateString): number {
    return Number.parseInt(date.substring(0, 3))
  }

  /**
   * ISODate(YYYY-MM-DD) 를 받아 요일 인덱스 추출
   */
  static getDayIndexFromISODate(date: ISODateString): number {
    return new Date(date).getDay()
  }

  /**
   * ISODate(YYYY-MM-DD) 를 받아 날짜(일) 추출
   */
  static getDateFromISODate(date: ISODateString): number {
    return removeLeadingZero(date.split('-')[2])
  }

  /**
   * ISODate(YYYY-MM-DD) 혹은 년도와 월을 받아 ISOMonth(YYYY-MM) 를 반환
   */
  static getISOMonthString(
    yearOrDate: number | ISODateString,
    month?: number | MonthKey,
  ): ISOMonthString {
    if (typeof yearOrDate !== 'number') {
      return yearOrDate.substring(0, 7) as ISOMonthString
    }
    let monthIndex: number
    if (month && typeof month === 'number') {
      monthIndex = month
    } else if (month && typeof month === 'string') {
      monthIndex = Object.keys(MONTHS).indexOf(month)
    } else {
      throw new Error('Invalid date format for year or month')
    }
    return `${yearOrDate}-${monthIndex.toString().padStart(2, '0')}` as ISOMonthString
  }

  /**
   * 특정 월의 마지막 날짜(일) 반환
   */
  static getLastDate(year: number, month: number | string): number {
    if (typeof month === 'number') {
      return new Date(year, month, 0).getDate()
    }
    return new Date(year, Object.keys(MONTHS).indexOf(month) + 1, 0).getDate()
  }

  /**
   * 특정 월의 1일의 요일의 인덱스 반환
   */
  static getFirstDateDay(year: number, month: number | string): number {
    let firstDay: number
    if (typeof month === 'number') {
      firstDay = new Date(year, month, 1).getDay()
    } else {
      firstDay = new Date(year, Object.keys(MONTHS).indexOf(month), 1).getDay()
    }
    return (firstDay + 6) % 7
  }

  /**
   * 특정 월의 주 수 반환
   */
  static getWeekLength(year: number, month: any): number {
    const firstDateDay = DateUtils.getFirstDateDay(year, month)
    const lastDate = DateUtils.getLastDate(year, month)
    return Math.ceil((lastDate + firstDateDay) / 7)
  }

  /**
   * 선택한 날짜가 몇번째 주 인지 계산
   */
  static getThisWeekIndex(dateString: ISODateString): number {
    const date = new Date(dateString)
    const day = date.getDate() // 현재 날짜
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const daysInFirstWeek = 7 - firstDayOfWeek
    if (day <= daysInFirstWeek) {
      return 1
    }
    const remainingDays = day - daysInFirstWeek
    return Math.ceil(remainingDays / 7 + 1)
  }

  /**
   * 선택한 날짜의 일주일치 ISODate(YYYY-MM-DD) 배열 반환 (월요일 ~ 일요일)
   */
  static getThisWeekArray(dateString: ISODateString): ISODateString[] {
    const date = new Date(dateString)
    const dayOfWeek = date.getDay() // 0: 일요일, 1: 월요일, ..., 6: 토요일
    // 주의 시작일(월요일)을 계산
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(date)
    monday.setDate(date.getDate() + mondayOffset)
    const weekDate: ISODateString[] = []
    // 월요일부터 시작하여 7일 추가
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday)
      currentDate.setDate(monday.getDate() + i)
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth() + 1
      const dayOfMonth = currentDate.getDate()
      weekDate.push(DateUtils.getISODateString(year, month, dayOfMonth))
    }
    return weekDate
  }

  /**
   * 두 날짜 사이의 일수 계산
   */
  static getDaysBetweenDates(startDate: string, endDate: string): number {
    const start: Date = new Date(startDate)
    const end: Date = new Date(endDate)
    const diffTime: number = Math.abs(end.getTime() - start.getTime())
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * 가입일로부터 현재까지 일수 계산
   */
  static getDaysSinceSignup(createdAt: string): number {
    const today = new Date()
    const signupDate = new Date(createdAt)
    const diffTime = today.getTime() - signupDate.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  /**
   * 인수로 받은 YYYY-MM-DD 의 첫째날 YYYY-MM-DD 반환
   */
  static getFirstDateString(date: ISODateString): string {
    const dateObj = new Date(date)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    return `${year}-${month.toString().padStart(2, '0')}-01`
  }

  /**
   * 인수로 받은 YYYY-MM-DD 의 마지막날 YYYY-MM-DD 반환
   * @param date
   */
  static getLastDateString(date: ISOMonthString): string {
    const year = Number(date.substring(0, 4))
    const month = Number(date.substring(5, 7))
    const lastDate = new Date(year, month, 0).getDate()
    return `${date}-${lastDate}`
  }
}
