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
  name: string
  count: number
  score: number
}
