import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { HeaderContainer } from '@/components/shared/HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';

export const HomeHeader = () => {
  return (
    <HeaderContainer>
      <XStack>
        <Button icon={Menu} />
        <View flex={1} />
        <ThemeToggle />
      </XStack>
    </HeaderContainer>
  );
};
