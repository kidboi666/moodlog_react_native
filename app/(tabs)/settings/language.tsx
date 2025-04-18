import { useCallback } from 'react'
import { RadioGroup } from 'tamagui'

import { useApp } from '@/store'
import type { Languages } from '@/types'

import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { RadioGroupItem } from '@/components/shared/RadioGroupItem'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'

export default function Screen() {
  const language = useApp(state => state.settings.language)
  const onSettingChange = useApp(state => state.onSettingChange)

  const handleValueChange = useCallback(
    (language: string) => {
      onSettingChange('language', language as Languages)
    },
    [onSettingChange],
  )

  return (
    <ViewContainer Header={<SettingHeader />}>
      <RadioGroup
        value={language}
        onValueChange={handleValueChange}
        name='theme'
        gap='$4'
      >
        {/* English */}
        <RadioGroupItem
          value='en'
          label='English'
          onValueChange={handleValueChange}
        />

        {/* 한국어 */}
        <RadioGroupItem
          value='ko'
          label='한국어'
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  )
}
