import { ExceptionState } from './util.types'

export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export type MoodName = string
export type MoodColor = string

export type Mood = {
  id: string
  name: MoodName
  color: MoodColor
  createdAt: string
}

export type JournalMood = Pick<Mood, 'name'> & {
  level: MoodLevel
}

export type Moods = {
  [id: string]: Mood
}

export type SignatureMood = {
  type: string
  count: number
  score: number
}

export interface MoodStoreState extends ExceptionState {
  moods: Moods
  moodLimit: number
  moodCount: number
  addMyMood: (myMood: Mood) => void
  removeMyMood: (myMoodId: string) => void
}
