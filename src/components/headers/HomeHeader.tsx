import { HeaderContainer } from '../HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { PressStyle } from '@/constants/styles';

export const HomeHeader = ({ navigation }) => {
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
          onPress={() => navigation.toggleDrawer()}
          pressStyle={PressStyle}
        />
        <View flex={1} />
      </XStack>
    </HeaderContainer>
  );
};
