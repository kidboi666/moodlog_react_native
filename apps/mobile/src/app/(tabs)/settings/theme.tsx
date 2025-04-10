import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { SettingHeader } from '@/core/components/features/settings/SettingHeader'
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { useAppTheme } from '@/core/store/theme.store'
import type { Theme } from '@/types/theme.types'

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
    <ViewContainer Header={<SettingHeader />}>
      <RadioGroup
        value={currentTheme}
        onValueChange={handleValueChange}
        name='theme'
        gap='$4'
      >
        {/* system */}
        <RadioGroupItem
          value='system'
          label={t('settings.theme.system')}
          onValueChange={handleValueChange}
        />

        {/* dark */}
        <RadioGroupItem
          value='dark'
          label={t('settings.theme.dark')}
          onValueChange={handleValueChange}
        />

        {/* light */}
        <RadioGroupItem
          value='light'
          label={t('settings.theme.light')}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  )
}
