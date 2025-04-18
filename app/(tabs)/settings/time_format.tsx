import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { useApp } from '@/store'
import { TimeFormat } from '@/types'

import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { RadioGroupItem } from '@/components/shared/RadioGroupItem'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'

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
    <ViewContainer Header={<SettingHeader />}>
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
