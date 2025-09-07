import { useCallback } from 'react'
import { RadioButton } from 'react-native-paper'

import { ScreenView } from '@/src/components/shared'
import { useApp } from '@/src/store'
import type { Languages } from '@/src/types'

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
    <ScreenView>
      <RadioButton.Group value={language} onValueChange={handleValueChange}>
        {languages.map(language => (
          <RadioButton.Item
            key={language.value}
            value={language.value}
            label={language.label}
          />
        ))}
      </RadioButton.Group>
    </ScreenView>
  )
}
