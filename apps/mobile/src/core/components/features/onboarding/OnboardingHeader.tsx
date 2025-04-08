import * as S from 'src/core/components/features/onboarding/OnboardingHeader.styled';

import { useStepProgress } from '@/core/store/step-progress.store';

export const OnboardingHeader = () => {
  const { currentStep, totalSteps } = useStepProgress();

  return (
    <S.HeaderContainer>
      <S.StepDotBox>
        {Array.from({ length: totalSteps }, (_, i) => (
          <S.Dot key={i} isCurrentStep={i === currentStep} />
        ))}
      </S.StepDotBox>
    </S.HeaderContainer>
  );
};
