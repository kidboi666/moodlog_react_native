import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { RadioGroupItem } from '@/features/setting/components'
import { ViewContainer } from '@/shared/components'
import { useApp } from '@/shared/store'
import { TimeFormat } from '@/shared/types'

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
    <ViewContainer>
      <RadioGroup
        value={timeFormat}
        onValueChange={handleValueChange}
        name='theme'
        gap='$4'
      >
        {/* 12hour */}
        <RadioGroupItem
          key={TimeFormat.HOUR_12}
          value={TimeFormat.HOUR_12}
          label={t('settings.timeFormat.12')}
          onValueChange={handleValueChange}
        />

        {/* 24hor */}
        <RadioGroupItem
          key={TimeFormat.HOUR_24}
          value={TimeFormat.HOUR_24}
          label={t('settings.timeFormat.24')}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  )
}
