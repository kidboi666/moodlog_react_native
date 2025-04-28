import { useApp } from 'shared/store'
import { GetThemeValueForKey } from 'tamagui'

export const useCustomFont = () => {
  const font = useApp(state => state.settings.fontTheme)

  const fontName = font
  const fontNameWithTokenPrefix =
    `$${font}` as unknown as GetThemeValueForKey<'fontFamily'>

  return { fontName, fontNameWithTokenPrefix }
}
