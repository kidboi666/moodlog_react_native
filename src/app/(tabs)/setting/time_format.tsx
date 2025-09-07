import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioButton } from 'react-native-paper'

import { useApp } from '@/src/data/store'
import { ScreenView } from '@/src/shared/components'
import { TimeFormat } from '@/src/shared/types'

export default function Screen() {
  const timeFormat = useApp(state => state.settings.timeFormat)
  const onSettingChange = useApp(state => state.onSettingChange)
  const { t } = useTranslation()

  const handleValueChange = useCallback(
    (timeFormat: string) => {
      onSettingChange('timeFormat', timeFormat as TimeFormat)
    },
    [onSettingChange],
  )

  return (
    <ScreenView>
      <RadioButton.Group value={timeFormat} onValueChange={handleValueChange}>
        {/* 12hour */}
        <RadioButton.Item
          key={TimeFormat.HOUR_12}
          value={TimeFormat.HOUR_12}
          label={t('settings.timeFormat.12')}
        />
        {/* 24hor */}
        <RadioButton.Item
          key={TimeFormat.HOUR_24}
          value={TimeFormat.HOUR_24}
          label={t('settings.timeFormat.24')}
        />
      </RadioButton.Group>
    </ScreenView>
  )
}
