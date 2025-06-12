export enum MoodLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export enum MoodName {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  EXCITED = 'excited',
  CALM = 'calm',
  TIRED = 'tired',
  ANXIOUS = 'anxious',
  GRATEFUL = 'grateful',
}

export type SignatureMood = {
  id: number
  count: number
  score: number
}
