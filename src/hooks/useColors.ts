import { themeManager } from '@/lib/theme'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

export const useColors = () => {
  const colorScheme = useColorScheme()

  useEffect(() => {
    themeManager.setTheme(colorScheme === 'dark' ? 'dark' : 'light')
  }, [colorScheme])

  return {
    colors: themeManager.getColors(),
    tokens: themeManager.getColorTokens(),
    styles: themeManager.getAppStyles(),
    utils: {
      withOpacity: themeManager.withOpacity.bind(themeManager),
      hexToRgba: themeManager.hexToRgba.bind(themeManager),
      isColorDark: themeManager.isColorDark.bind(themeManager),
      getTextColor: themeManager.getTextColor.bind(themeManager),
    },
  }
}
