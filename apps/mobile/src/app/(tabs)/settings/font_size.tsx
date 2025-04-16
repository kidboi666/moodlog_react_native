import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { SettingHeader } from '@/core/components/features/settings/SettingHeader'
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { useApp } from '@/core/store/app.store'
import { type ViewFontSizeValue, viewFontSize } from '@/types/app.types'

export default function Screen() {
  const fontSize = useApp(state => state.settings.fontSize)
  const onSettingChange = useApp(state => state.onSettingChange)
  const { t } = useTranslation()

  const handleValueChange = useCallback(
    (value: string) => {
      onSettingChange('fontSize', value as ViewFontSizeValue)
    },
    [onSettingChange],
  )

  return (
    <ViewContainer Header={<SettingHeader />}>
      <RadioGroup
        value={fontSize}
        onValueChange={handleValueChange}
        name='fontSize'
        gap='$4'
      >
        {/* 작은 크기 */}
        <RadioGroupItem
          key={viewFontSize['8']}
          value={viewFontSize['8']}
          label={t('settings.fontSize.small')}
          onValueChange={handleValueChange}
        />

        {/* 중간 크기 */}
        <RadioGroupItem
          key={viewFontSize['10']}
          value={viewFontSize['10']}
          label={t('settings.fontSize.medium')}
          onValueChange={handleValueChange}
        />

        {/* 큰 크기 */}
        <RadioGroupItem
          key={viewFontSize['12']}
          value={viewFontSize['12']}
          label={t('settings.fontSize.large')}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  )
}
