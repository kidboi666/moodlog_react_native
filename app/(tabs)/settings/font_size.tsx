import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup, View } from 'tamagui'

import { useApp } from '@/store'
import { ViewFontSize } from '@/types'

import { RadioGroupItem } from '@/components/features/settings/RadioGroupItem'
import { BaseText } from '@/components/shared/BaseText'
import { ViewContainer } from '@/components/shared/ViewContainer'

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
    <ViewContainer>
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
