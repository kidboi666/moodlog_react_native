import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from 'tamagui'

import { SettingHeader } from '@/core/components/features/settings/SettingHeader'
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { useApp } from '@/core/store/app.store'
import { FontTheme } from '@/types/app.types'

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
        {/* Pretendard */}
        <RadioGroupItem
          value={FontTheme.PRETENDARD}
          label={t('settings.font.pretendard')}
          onValueChange={handleValueChange}
        />

        {/* Inter */}
        <RadioGroupItem
          value={FontTheme.INTER}
          label={t('settings.font.inter')}
          onValueChange={handleValueChange}
        />

        {/* Nanum Pen Script */}
        <RadioGroupItem
          value={FontTheme.NANUM_PEN}
          label={t('settings.font.nanumPenScript')}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  )
}
