import { Check } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'

import {
  FormSection,
  MoodMenuSelector,
  MoodPreviewItem,
  SuccessCreateMoodEffect,
} from '@/components/features/mood/components'
import {
  useAddMood,
  useMoodForm,
  useScrollMood,
} from '@/components/features/write/hooks'
import { HeaderContent, StepDot, ViewContainer } from '@/components/shared'

export default function CreateMoodScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const { currentStep, onLeftPress, onRightPress, position } = useScrollMood()
  const {
    mood,
    isSuccess,
    onMoodColorChange,
    onMoodNameChange,
    onIsSuccessChange,
  } = useMoodForm()
  const { onSubmit } = useAddMood(mood, onIsSuccessChange)

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
          rightAction={onSubmit}
          rightActionIcon={Check}
          rightActionDisabled={!mood.name || !mood.color}
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
        <MoodPreviewItem name={mood.name} color={mood.color} />
        <FormSection
          moodName={mood.name}
          onMoodNameChange={onMoodNameChange}
          moodColor={mood.color}
          onMoodColorChange={onMoodColorChange}
          position={position}
          width={width}
          currentStep={currentStep}
        />
      </KeyboardAvoidingView>
      <MoodMenuSelector
        handleLeftPress={onLeftPress}
        handleRightPress={onRightPress}
        currentStep={currentStep}
      />
      <SuccessCreateMoodEffect active={isSuccess} color={mood.color} />
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    gap: 40,
  },
})
