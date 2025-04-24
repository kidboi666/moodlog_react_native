import { View, XStack, styled } from 'tamagui'

import { useStepProgress } from '@/store'

const Container = styled(View, {
  width: '100%',
  items: 'center',
})

const SpacingBox = styled(XStack, {
  gap: '$2',
})

const Dot = styled(View, {
  width: '$1',
  height: '$0.75',
  rounded: '$4',
  bg: '$gray7',

  variants: {
    isCurrentStep: {
      true: {
        bg: '$gray12',
      },
    },
  } as const,
})

export const StepDot = () => {
  const currentStep = useStepProgress(state => state.currentStep)
  const totalSteps = useStepProgress(state => state.totalSteps)

  return (
    <Container>
      <SpacingBox>
        {Array.from({ length: totalSteps }, (_, i) => (
          <Dot key={i} isCurrentStep={i === currentStep} />
        ))}
      </SpacingBox>
    </Container>
  )
}
