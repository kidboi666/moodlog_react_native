import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { HeaderContainer } from '@/components/shared/HeaderContainer';
import { View, XStack } from 'tamagui';

export const HomeHeader = () => {
  return (
    <HeaderContainer>
      <XStack>
        <View flex={1} />
        <ThemeToggle />
      </XStack>
    </HeaderContainer>
  );
};
