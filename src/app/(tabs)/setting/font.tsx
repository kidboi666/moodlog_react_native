import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioButton } from 'react-native-paper'

import { ScreenView } from '@/components/shared'
import { useApp } from '@/store'
import { FontTheme } from '@/types'

const fontList = [
  {
    value: FontTheme.PRETENDARD,
    label: 'settings.font.pretendard',
  },
  {
    value: FontTheme.INTER,
    label: 'settings.font.inter',
  },
  {
    value: FontTheme.NANUM_PEN,
    label: 'settings.font.nanumPenScript',
  },
  {
    value: FontTheme.ROBOTO_MONO,
    label: 'settings.font.robotoMono',
  },
  {
    value: FontTheme.ESAMANRU,
    label: 'settings.font.esamanru',
  },
  {
    value: FontTheme.LEE_SEOYUN,
    label: 'settings.font.leeSeoyun',
  },
]

export default function FontScreen() {
  const { t } = useTranslation()
  const fontTheme = useApp(state => state.settings.fontTheme)
  const onSettingChange = useApp(state => state.onSettingChange)

  const handleValueChange = useCallback(
    (fontTheme: string) => {
      onSettingChange('fontTheme', fontTheme as FontTheme)
    },
    [onSettingChange],
  )

  return (
    <ScreenView edges={['top']}>
      <RadioButton.Group value={fontTheme} onValueChange={handleValueChange}>
        {fontList.map(font => (
          <RadioButton.Item
            key={font.value}
            value={font.value}
            label={t(font.label)}
          />
        ))}
      </RadioButton.Group>
    </ScreenView>
  )
}
