import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup, View } from 'tamagui'

import { SettingHeader } from '@/core/components/features/settings/SettingHeader'
import { BaseText } from '@/core/components/shared/BaseText'
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { useApp } from '@/core/store/app.store'
import { ViewFontSize } from '@/types/app.types'

const fontSizes = [
  {
    value: ViewFontSize.XS,
    label: 'settings.fontSize.smaller',
  },
  {
    value: ViewFontSize.SM,
    label: 'settings.fontSize.small',
  },
  {
    value: ViewFontSize.MD,
    label: 'settings.fontSize.medium',
  },
  {
    value: ViewFontSize.LG,
    label: 'settings.fontSize.large',
  },
  {
    value: ViewFontSize.XL,
    label: 'settings.fontSize.larger',
  },
]

export default function Screen() {
  const fontSize = useApp(state => state.settings.fontSize)
  const onSettingChange = useApp(state => state.onSettingChange)
  const { t } = useTranslation()

  const handleValueChange = useCallback(
    (value: string) => {
      onSettingChange('fontSize', value as ViewFontSize)
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
        {fontSizes.map(fontSize => (
          <RadioGroupItem
            key={fontSize.value}
            value={fontSize.value}
            label={t(fontSize.label)}
            onValueChange={handleValueChange}
          />
        ))}
        <View>
          <BaseText fontSize={fontSize}>안녕하세요.</BaseText>
        </View>
      </RadioGroup>
    </ViewContainer>
  )
}
