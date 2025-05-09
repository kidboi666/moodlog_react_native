import { moods } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export type Mood = InferSelectModel<typeof moods>

export type MoodDraft = Pick<Mood, 'name' | 'color'>

export type JournalMood = Pick<Mood, 'id'> & {
  level: MoodLevel
}

export type Moods = {
  [id: string]: Mood
}

export type SignatureMood = {
  id: string
  count: number
  score: number
}
