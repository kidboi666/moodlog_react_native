export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export type MoodName = string
export type MoodType = MoodName
export type MoodColor = string

export type Mood = {
  name: MoodName
  level: MoodLevel
  color?: MoodColor
}

export type MyMood = {
  id: string
  name: MoodName
  color: MoodColor
  level: MoodLevel
  createdAt: string
}

export type MyMoods = {
  [id: string]: MyMood
}

export type SignatureMood = {
  name: string
  count: number
  score: number
}
