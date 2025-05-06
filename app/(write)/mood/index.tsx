import { Check } from '@tamagui/lucide-icons'
import * as Crypto from 'expo-crypto'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { useControllableState, useTheme } from 'tamagui'

import {
  FormSection,
  MoodMenuSelector,
  MoodPreviewItem,
  SuccessCreateMoodEffect,
} from '@/features/mood/components'
import { MoodService } from '@/features/mood/services'
import { HeaderContent, StepDot, ViewContainer } from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useMood, useStepProgress, useUI } from '@/shared/store'
import { MoodName } from '@/shared/types'
import { delay } from '@/shared/utils'

export default function CreateMoodScreen() {
  const router = useRouter()
  const theme = useTheme()
  const [moodName, setMoodName] = useState<MoodName>('')
  const [moodColor, setMoodColor] = useState(theme.green9.val)
  const [isSuccess, setIsSuccess] = useState(false)
  const moods = useMood(state => state.moods)
  const addMyMood = useMood(state => state.addMood)
  const setNavigating = useUI(state => state.setNavigating)
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

  const handleLeftPress = () => {
    if (currentStep === 1) {
      goToPrevStep()
      setPositionI(
        prev => (prev + positionList.length - 1) % positionList.length,
      )
    }
  }
  const handleRightPress = () => {
    if (currentStep === 0) {
      goToNextStep()
      setPositionI(prev => (prev + 1) % positionList.length)
    }
  }

  const handleSuccess = useCallback(async () => {
    setIsSuccess(true)
    Keyboard.dismiss()

    const animationTimer = setTimeout(() => {
      setIsSuccess(false)
    }, DelayMS.ANIMATION.LONG[2])

    await delay(DelayMS.WAIT.WRITE_MOOD, () => {
      router.replace({
        pathname: '/(tabs)',
        params: {
          moodName,
          moodColor,
        },
      })
    })

    return () => clearTimeout(animationTimer)
  }, [])

  const handleSubmit = useCallback(async () => {
    const newMood = {
      id: Crypto.randomUUID(),
      name: moodName,
      color: moodColor,
      createdAt: new Date().toISOString(),
    }
    const updatedMoods = MoodService.addMood(moods, newMood)
    addMyMood(updatedMoods)

    handleSuccess()
  }, [moodName, router, setNavigating])

  useEffect(() => {
    if (currentStep === 0) {
      Keyboard.dismiss()
    }
  }, [currentStep])

  return (
    <ViewContainer
      edges={['bottom']}
      Header={
        <HeaderContent
          leftAction={() => router.back()}
          rightAction={handleSubmit}
          rightActionIcon={Check}
          rightActionDisabled={!moodName || !moodColor}
        >
          <StepDot />
        </HeaderContent>
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.keyboardAvoidingView}
      >
        <MoodPreviewItem name={moodName} color={moodColor} />
        <FormSection
          name={moodName}
          setName={setMoodName}
          color={moodColor}
          setColor={setMoodColor}
          position={position}
          width={width}
          currentStep={currentStep}
        />
      </KeyboardAvoidingView>
      <MoodMenuSelector
        handleLeftPress={handleLeftPress}
        handleRightPress={handleRightPress}
        currentStep={currentStep}
      />
      <SuccessCreateMoodEffect active={isSuccess} color={moodColor} />
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    gap: 40,
  },
})
