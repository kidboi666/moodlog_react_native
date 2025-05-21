import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { RadioGroupItem } from '@/components/features/setting'
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
    <Screen>
      <RadioGroup value={currentTheme} name='theme' gap='$4'>
        {/* system */}
        <RadioGroupItem
          key='system'
          value='system'
          label={t('settings.theme.system')}
          onValueChange={handleValueChange}
        />

        {/* dark */}
        <RadioGroupItem
          key='dark'
          value='dark'
          label={t('settings.theme.dark')}
          onValueChange={handleValueChange}
        />

        {/* light */}
        <RadioGroupItem
          key='light'
          value='light'
          label={t('settings.theme.light')}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Screen>
  )
}
