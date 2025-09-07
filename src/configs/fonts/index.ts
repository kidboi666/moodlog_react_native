import configureFonts from 'react-native-paper/src/styles/fonts'

const baseFont = {
  fontFamily: 'LeeSeoyun-Regular',
} as const

export const baseFontVariants = configureFonts({ config: baseFont })

export const customFontVariants = {
  h1: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  h4: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  h5: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  h6: {
    fontWeight: 'bold',
    fontSize: 14,
  },
} as const
