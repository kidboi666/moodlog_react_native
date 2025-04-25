import { useApp } from 'shared/store'
import { GetThemeValueForKey } from 'tamagui'

export const useCustomFont = () => {
  const font = useApp(state => state.settings.fontTheme)

  return `$${font}` as unknown as GetThemeValueForKey<'fontFamily'>
}
