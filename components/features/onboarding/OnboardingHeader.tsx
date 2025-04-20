import { View, XStack, styled } from 'tamagui'

import { useStepProgress } from '@/store'

import { HeaderContent as HOSHeaderContainer } from '@/components/shared'

const HeaderContainer = styled(HOSHeaderContainer, {
  py: '$4',
  justify: 'center',
})

const StepDotBox = styled(XStack, {
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

export const OnboardingHeader = () => {
  const { currentStep, totalSteps } = useStepProgress()

  return (
    <HeaderContainer>
      <StepDotBox>
        {Array.from({ length: totalSteps }, (_, i) => (
          <Dot key={i} isCurrentStep={i === currentStep} />
        ))}
      </StepDotBox>
    </HeaderContainer>
  )
}
