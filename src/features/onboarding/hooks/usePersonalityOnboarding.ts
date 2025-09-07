import { useCallback, useState } from 'react'

import { useApp } from '@/src/data/store'
import { AIPersonalityType } from '@/src/shared/types'

export function usePersonalityOnboarding() {
  const { onSettingChange, setOnboardingCompleted } = useApp()
  const [selectedPersonality, setSelectedPersonality] =
    useState<AIPersonalityType>(AIPersonalityType.BALANCED)

  const handleCompleteJourney = useCallback(async () => {
    await onSettingChange('aiPersonalityType', selectedPersonality)
    setOnboardingCompleted()
  }, [selectedPersonality, onSettingChange, setOnboardingCompleted])

  const selectPersonality = useCallback((personality: AIPersonalityType) => {
    setSelectedPersonality(personality)
  }, [])

  return {
    selectedPersonality,
    selectPersonality,
    onCompleteJourney: handleCompleteJourney,
  }
}
