import { InferSelectModel } from 'drizzle-orm'
import { moods } from '../../db/sqlite/schema'
import { Prettify } from './util.types'

export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export type Mood = InferSelectModel<typeof moods>
export type JournalMood = Prettify<
  Mood & {
    level: MoodLevel
  }
>

export type MoodDraft = Pick<Mood, 'name' | 'color'>

export type Moods = {
  [id: string]: Mood
}

export type SignatureMood = {
  id: string
  count: number
  score: number
}
