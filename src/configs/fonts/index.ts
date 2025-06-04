import configureFonts from 'react-native-paper/src/styles/fonts'

export const fontsToLoad = {
  'Pretendard-Medium': require('../../../assets/fonts/Pretendard-Medium.ttf'),
  'Pretendard-Regular': require('../../../assets/fonts/Pretendard-Regular.ttf'),
  'Pretendard-SemiBold': require('../../../assets/fonts/Pretendard-SemiBold.ttf'),
  'Pretendard-Bold': require('../../../assets/fonts/Pretendard-Bold.ttf'),
  'NanumPenScript-Regular': require('../../../assets/fonts/NanumPenScript-Regular.ttf'),
  'RobotoMono-Regular': require('../../../assets/fonts/RobotoMono-Regular.ttf'),
  'RobotoMono-Medium': require('../../../assets/fonts/RobotoMono-Medium.ttf'),
  'RobotoMono-SemiBold': require('../../../assets/fonts/RobotoMono-SemiBold.ttf'),
  'RobotoMono-Bold': require('../../../assets/fonts/RobotoMono-Bold.ttf'),
  'Esamanru-Light': require('../../../assets/fonts/Esamanru-Light.otf'),
  'Esamanru-Medium': require('../../../assets/fonts/Esamanru-Medium.otf'),
  'Esamanru-Bold': require('../../../assets/fonts/Esamanru-Bold.otf'),
  'LeeSeoyun-Regular': require('../../../assets/fonts/LeeSeoyun-Regular.ttf'),
}

const baseFont = {
  fontFamily: 'LeeSeoyun-Regular',
} as const

export const baseVariants = configureFonts({ config: baseFont })

export const customVariants = {
  h1: {
    fontWeight: 'bold',
    fontFamily: 'LeeSeoyun-Regular',
    fontSize: 36,
  },
  h2: {
    fontWeight: 'bold',
    fontFamily: 'LeeSeoyun-Regular',
    fontSize: 30,
  },
  h3: {
    fontWeight: 'bold',
    fontFamily: 'LeeSeoyun-Regular',
    fontSize: 24,
  },
  h4: {
    fontWeight: 'bold',
    fontFamily: 'LeeSeoyun-Regular',
    fontSize: 20,
  },
  h5: {
    fontWeight: 'bold',
    fontFamily: 'LeeSeoyun-Regular',
    fontSize: 16,
  },
  h6: {
    fontWeight: 'bold',
    fontFamily: 'LeeSeoyun-Regular',
    fontSize: 14,
  },
} as const
