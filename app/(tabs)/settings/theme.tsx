import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { useAppTheme } from '@/store'
import type { Theme } from '@/types'

import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { RadioGroupItem } from '@/components/shared/RadioGroupItem'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'

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
    </ViewContainer>
  )
}
