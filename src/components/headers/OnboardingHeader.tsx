import { HeaderContainer } from '../containers/HeaderContainer';
import { View, XStack } from 'tamagui';
import { useStepProgress } from '@/store/hooks/useStepProgress';

export const OnboardingHeader = () => {
  const { progress, totalSteps } = useStepProgress();

  return (
    <HeaderContainer>
      <XStack justify="center">
        <XStack>
          {Array.from({ length: totalSteps }, (_, i) => (
            <View key={i} width="$1" rounded="$4" bg="$gray7" height="$0.75" />
          ))}
          <View
            animation="quick"
            l={`${progress}%`}
            width="$1"
            bg="$gray12"
            height="$0.75"
            rounded="$4"
            position="absolute"
          />
        </XStack>
      </XStack>
    </HeaderContainer>
  );
};
