import { PropsWithChildren, useEffect, useState } from 'react'

import { useColorScheme } from 'react-native'
import { Theme } from 'tamagui'
import { useAppTheme } from '../store/theme.store'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const updateSystemTheme = useAppTheme(state => state.updateSystemTheme)
  const colorScheme = useColorScheme()
  const resolvedTheme = useAppTheme(state => state.resolvedTheme)
  const currentTheme = useAppTheme(state => state.currentTheme)

  const [, forceUpdate] = useState({})

  useEffect(() => {
    if (colorScheme) {
      updateSystemTheme(colorScheme)
    }
  }, [colorScheme, updateSystemTheme])

  useEffect(() => {
    forceUpdate({})
  }, [resolvedTheme, currentTheme])

  const theme = resolvedTheme || (colorScheme === 'dark' ? 'dark' : 'light')

  return <Theme name={theme}>{children}</Theme>
}
