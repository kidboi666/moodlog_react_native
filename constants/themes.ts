export const moodTheme = {
  angry: {
    zero: '$red5',
    half: '$red8',
    full: '$red10',
    emoji: '😠',
  },
  peace: {
    zero: '$green5',
    half: '$green8',
    full: '$green10',
    emoji: '😌',
  },
  happy: {
    zero: '$yellow5',
    half: '$yellow8',
    full: '$yellow10',
    emoji: '😄',
  },
  sad: {
    zero: '$blue5',
    half: '$blue8',
    full: '$blue10',
    emoji: '😢',
  },
  simple: {
    zero: '$blue5',
    half: '$blue8',
    full: '$blue10',
    emoji: '😊',
  },
} as const

export const simpleMoodTheme = {
  very_bad: '$red10',
  bad: '$red7',
  neutral: '$gray7',
  good: '$green7',
  very_good: '$green10',
} as const
