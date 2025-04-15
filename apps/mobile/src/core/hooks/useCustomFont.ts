import { useApp } from '@/core/store/app.store'
import { GetThemeValueForKey } from 'tamagui'

export const useCustomFont = () => {
  const font = useApp(state => state.settings.fontTheme)

  const computedFont = `$${font}`

  return computedFont as unknown as GetThemeValueForKey<'fontFamily'>
}
