import { MONTHS, WEEK_DAY } from '@/src/constants'

export type DateCount = {
  [date: ISODateString]: number
}

export enum TimeRange {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export type ISODateString = `${number}-${number}-${number}`

export type ISOMonthString = `${number}-${number}`

export type ISOString = ISODateString | ISOMonthString

export type WeekDayKey = keyof typeof WEEK_DAY

export type WeekDayValue = (typeof WEEK_DAY)[WeekDayKey]

export type MonthKey = keyof typeof MONTHS

export type MonthValue = (typeof MONTHS)[MonthKey]
