import type { ISOMonthString } from './date.types'

export type ExpressiveMonthStats = {
  month: ISOMonthString
  count: number
}

export type CountScore = {
  count: number
  score: number
}

export type ScoreBoard = {
  [key: string]: CountScore | undefined
}

export enum ExpansionState {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}
