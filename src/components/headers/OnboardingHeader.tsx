import { HeaderContainer } from '../HeaderContainer';
import { View, XStack } from 'tamagui';

export const OnboardingHeader = () => {
  return (
    <HeaderContainer>
      <XStack justify="center">
        <View width="$6" rounded="$4" bg="$gray7" height="$0.75">
          <View width="33%" bg="$gray12" height="$0.75" rounded="$4" />
        </View>
      </XStack>
    </HeaderContainer>
  );
};
