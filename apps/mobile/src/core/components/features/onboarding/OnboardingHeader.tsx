import { useStepProgress } from '@/core/store/contexts/step-progress.context';
import * as S from 'src/core/components/features/onboarding/OnboardingHeader.styled';

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
