import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { useColorScheme } from 'react-native'

import { useApp } from '@/core/store/app.store'
import { useAppTheme } from '@/core/store/theme.store'
import { FontTheme } from '@/types/app.types'
import config from '../../../tamagui.config'

export const TamaguiBaseProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const resolvedTheme = useAppTheme(state => state.resolvedTheme)
  const fontTheme = useApp(state => state.settings.fontTheme)

  const getThemeName = () => {
    const font = fontTheme || FontTheme.PRETENDARD // 폰트 테마가 없을 경우 기본값 사용
    return `${resolvedTheme}_${font}`
  }

  return (
    <TamaguiProvider config={config} defaultTheme={getThemeName()} {...rest}>
      {children}
    </TamaguiProvider>
  )
}
