export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export type MoodName = string
export type MoodColor = string

// 감정 기본 타입 (사용자가 생성하는 커스텀 감정)
export type MyMood = {
  id: string
  name: MoodName
  color: MoodColor
  createdAt: string
}

// 일기장에서 사용할 때는 level을 추가함
export type JournalMood = MyMood & {
  level: MoodLevel
}

export type MyMoods = {
  [id: string]: MyMood
}

export type SignatureMood = {
  type: string
  count: number
  score: number
}
