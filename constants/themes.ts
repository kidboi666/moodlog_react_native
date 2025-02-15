export const emotionTheme = {
  angry: {
    zero: '$red5',
    half: '$red8',
    full: '$red10',
  },
  peace: {
    zero: '$green5',
    half: '$green8',
    full: '$green10',
  },
  happy: {
    zero: '$yellow5',
    half: '$yellow8',
    full: '$yellow10',
  },
  sad: {
    zero: '$blue5',
    half: '$blue8',
    full: '$blue10',
  },
} as const;

export const emotionColorContext = {
  angry: 'red',
  peace: 'green',
  happy: 'yellow',
  sad: 'blue',
};

export const emotionLevelContext = {
  zero: 5,
  half: 8,
  full: 10,
};
