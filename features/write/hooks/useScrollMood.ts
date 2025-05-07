import { useStepProgress } from '@/shared/store'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useControllableState } from 'tamagui'

export const useScrollMood = () => {
  const { width } = useWindowDimensions()
  const {
    goToPrevStep,
    goToNextStep,
    state: { currentStep },
  } = useStepProgress()
  const [positionI, setPositionI] = useControllableState({
    strategy: 'most-recent-wins',
    defaultProp: 0,
  })
  const positionList = [{ x: 0 }, { x: -width }]
  const position = positionList[positionI]

  const handleLeftPress = useCallback(() => {
    if (currentStep === 1) {
      goToPrevStep()
      setPositionI(
        prev => (prev + positionList.length - 1) % positionList.length,
      )
    }
  }, [currentStep, goToPrevStep, setPositionI])

  const handleRightPress = useCallback(() => {
    if (currentStep === 0) {
      goToNextStep()
      setPositionI(prev => (prev + 1) % positionList.length)
    }
  }, [currentStep, goToNextStep, setPositionI])

  return {
    currentStep,
    onLeftPress: handleLeftPress,
    onRightPress: handleRightPress,
    position,
  }
}
