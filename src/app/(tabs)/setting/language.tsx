import { useCallback } from 'react'
import { RadioButton } from 'react-native-paper'

import { useApp } from '@/src/data/store'
import { ScreenView } from '@/src/shared/components'
import type { Languages } from '@/src/shared/types'

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
