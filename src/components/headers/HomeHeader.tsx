import { HeaderContainer } from '@/components/HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { useDrawerContext } from '@/store/hooks/useDrawerContext';

export const HomeHeader = ({ navigation }) => {
  const { toggleDrawer } = useDrawerContext();
  return (
    <HeaderContainer>
      <XStack>
        <Button
          p="$2"
          unstyled
          animation="quick"
          rounded="$2"
          color="$gray11"
          icon={<Menu size="$1" />}
          onPress={() => toggleDrawer(navigation)}
          pressStyle={{
            opacity: 0.5,
            scale: 0.9,
          }}
        />
        <View flex={1} />
      </XStack>
    </HeaderContainer>
  );
};
