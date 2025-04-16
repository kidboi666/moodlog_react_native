import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { SettingHeader } from '@/core/components/features/settings/SettingHeader'
import { FontRadioGroupItem } from '@/core/components/shared/FontRadioGroupItem'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { useApp } from '@/core/store/app.store'
import { FontTheme } from '@/types/app.types'

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

export default function Screen() {
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
    <ViewContainer Header={<SettingHeader />}>
      <RadioGroup
        value={fontTheme}
        onValueChange={handleValueChange}
        name='font'
        gap='$4'
      >
        {fontList.map(font => (
          <FontRadioGroupItem
            key={font.value}
            value={font.value}
            label={t(font.label)}
            onValueChange={handleValueChange}
          />
        ))}
      </RadioGroup>
    </ViewContainer>
  )
}
