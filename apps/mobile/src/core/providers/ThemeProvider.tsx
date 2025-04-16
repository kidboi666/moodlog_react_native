import { PropsWithChildren, useEffect } from 'react'

import { useColorScheme } from 'react-native'
import { Theme } from 'tamagui'
import { useAppTheme } from '../store/theme.store'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const updateSystemTheme = useAppTheme(state => state.updateSystemTheme)
  const colorScheme = useColorScheme()
  const resolvedTheme = useAppTheme(state => state.resolvedTheme)

  const theme = resolvedTheme || (colorScheme === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    if (colorScheme) {
      updateSystemTheme(colorScheme)
    }
  }, [colorScheme, updateSystemTheme])

  return <Theme name={theme}>{children}</Theme>
}
