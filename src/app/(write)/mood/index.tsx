import { Check } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import {
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
} from '@/components/features/mood'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useMoodForm, useScrollMood } from '@/hooks'
import { useAddMood } from '@/queries'

export default function CreateMoodScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const { currentStep, onLeftPress, onRightPress, position } = useScrollMood()
  const { mood, isSuccess, onMoodColorChange, onMoodNameChange } = useMoodForm()
  const { mutate: onSubmit } = useAddMood()

  return (
    <ViewContainer
      edges={['bottom']}
      Header={
        <HeaderContent
          leftAction={() => router.back()}
          rightAction={() => onSubmit(mood)}
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
        <Delay flex={1} delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <MoodPreviewItem name={mood.name} color={mood.color} />
        </Delay>
        <Delay flex={1} delay={DelayMS.ANIMATION.MEDIUM[2]}>
          <FormSection
            moodName={mood.name}
            onMoodNameChange={onMoodNameChange}
            moodColor={mood.color}
            onMoodColorChange={onMoodColorChange}
            position={position}
            width={width}
            currentStep={currentStep}
          />
        </Delay>
      </KeyboardAvoidingView>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
        <MoodMenuSelector
          handleLeftPress={onLeftPress}
          handleRightPress={onRightPress}
          currentStep={currentStep}
        />
      </Delay>
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
