import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioButton } from 'react-native-paper'

import { ScreenView } from '@/components/shared'
import { useAppTheme } from '@/store'
import type { Theme } from '@/types'

export default function Screen() {
  const currentTheme = useAppTheme(state => state.currentTheme)
  const changeTheme = useAppTheme(state => state.changeTheme)
  const { t } = useTranslation()

  const handleValueChange = useCallback(
    (value: string) => {
      changeTheme(value as Theme)
    },
    [changeTheme],
  )

  return (
    <ScreenView>
      <RadioButton.Group onValueChange={handleValueChange} value={currentTheme}>
        {/* system */}
        <RadioButton.Item value='system' label={t('settings.theme.system')} />
        {/* dark */}
        <RadioButton.Item value='dark' label={t('settings.theme.dark')} />
        {/* light */}
        <RadioButton.Item value='light' label={t('settings.theme.light')} />
      </RadioButton.Group>
    </ScreenView>
  )
}
