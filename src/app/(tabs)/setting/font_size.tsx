import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'

import { BaseText, ScreenView } from '@/components/shared'
import { FONT_SIZE } from '@/constants'
import { useApp } from '@/store'
import { FontSize } from '@/types'

const fontSizes = [
  {
    value: FONT_SIZE.$3,
    label: 'settings.fontSize.smaller',
  },
  {
    value: FONT_SIZE.$4,
    label: 'settings.fontSize.small',
  },
  {
    value: FONT_SIZE.$5,
    label: 'settings.fontSize.medium',
  },
  {
    value: FONT_SIZE.$7,
    label: 'settings.fontSize.large',
  },
  {
    value: FONT_SIZE.$9,
    label: 'settings.fontSize.larger',
  },
]

export default function Screen() {
  const fontSize = useApp(state => state.settings.fontSize)
  const onSettingChange = useApp(state => state.onSettingChange)
  const { t } = useTranslation()

  const handleValueChange = useCallback(
    (value: string) => {
      onSettingChange('fontSize', value as unknown as FontSize)
    },
    [onSettingChange],
  )

  return (
    <ScreenView>
      <RadioButton.Group
        value={String(fontSize)}
        onValueChange={handleValueChange}
      >
        {fontSizes.map(fontSize => (
          <RadioButton.Item
            key={fontSize.value}
            value={String(fontSize.value)}
            label={t(fontSize.label)}
          />
        ))}
        <View>
          <BaseText defaultFontSize={fontSize}>안녕하세요.</BaseText>
        </View>
      </RadioButton.Group>
    </ScreenView>
  )
}
