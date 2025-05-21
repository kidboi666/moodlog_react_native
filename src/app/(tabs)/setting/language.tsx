import { useCallback } from 'react'
import { RadioGroup, styled } from 'tamagui'

import { RadioGroupItem } from '@/components/features/setting'
import { ScreenView } from '@/components/shared'
import { useApp } from '@/store'
import type { Languages } from '@/types'

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
]

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
    <Screen>
      <StyledRadioGroup value={language} onValueChange={handleValueChange}>
        {languages.map(language => (
          <RadioGroupItem
            key={language.value}
            value={language.value}
            label={language.label}
            onValueChange={handleValueChange}
          />
        ))}
      </StyledRadioGroup>
    </Screen>
  )
}

const StyledRadioGroup = styled(RadioGroup, {
  name: 'theme',
  gap: '$4',
})
