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
          size="$3"
          icon={Menu}
          onPress={() => toggleDrawer(navigation)}
        />
        <View flex={1} />
      </XStack>
    </HeaderContainer>
  );
};
