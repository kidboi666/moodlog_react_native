import { HeaderContainer } from '../HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { LayoutGrid, Menu } from '@tamagui/lucide-icons';
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
          color="$gray12"
          icon={<Menu size="$1" />}
          onPress={() => navigation.toggleDrawer()}
          pressStyle={PressStyle}
        />
        <View flex={1} />
        <Button
          unstyled
          p="$2"
          animation="quick"
          color="$gray12"
          icon={<LayoutGrid size="$1" />}
          onPress={() => null}
          pressStyle={PressStyle}
        />
      </XStack>
    </HeaderContainer>
  );
};
