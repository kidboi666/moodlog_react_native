import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { HeaderContainer } from '@/components/shared/HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { useDrawerContext } from '@/store/hooks/useDrawerContext';

export const HomeHeader = ({ navigation }) => {
  const { toggleDrawer } = useDrawerContext();
  return (
    <HeaderContainer>
      <XStack>
        <Button
          size="$2"
          icon={Menu}
          onPress={() => toggleDrawer(navigation)}
        />
        <View flex={1} />
        <ThemeToggle />
      </XStack>
    </HeaderContainer>
  );
};
