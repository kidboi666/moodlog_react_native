import { View, XStack } from 'tamagui';
import { useStepProgress } from '@/store/hooks/useStepProgress';
import { HeaderContainer } from '@/components/containers/HeaderContainer';

export const OnboardingHeader = () => {
  const { currentStep, totalSteps } = useStepProgress();

  return (
    <HeaderContainer>
      <XStack justify="center">
        <XStack gap="$2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <View
              key={i}
              width="$1"
              rounded="$4"
              bg={i === currentStep ? '$gray12' : '$gray7'}
              height="$0.75"
            />
          ))}
        </XStack>
      </XStack>
    </HeaderContainer>
  );
};
