import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'

import { useStepProgress } from '@/src/shared/context'

export function useOnboardingStep(stepNumber: number) {
  const { setStep } = useStepProgress()

  const handleNextStep = useCallback(() => {
    setStep(stepNumber + 1)
  }, [stepNumber])

  useFocusEffect(
    useCallback(() => {
      setStep(stepNumber)
    }, [stepNumber, setStep]),
  )

  return {
    onNextStep: handleNextStep,
  }
}
