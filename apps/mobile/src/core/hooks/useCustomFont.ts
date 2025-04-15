import { useApp } from '@/core/store/app.store'

export const useCustomFont = () => {
  const font = useApp(state => state.settings.fontTheme)

  const computedFont = `$${font}`

  return computedFont
}
