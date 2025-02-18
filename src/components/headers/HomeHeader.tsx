import { HeaderContainer } from '../containers/HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { LayoutGrid, Menu } from '@tamagui/lucide-icons';
import { PRESS_STYLE } from '@/constants/styles';

export const HomeHeader = ({ navigation }) => {
  return (
    <HeaderContainer>
      <XStack>
        <Button
          p="$2"
          unstyled
          rounded="$2"
          icon={<Menu size="$1" />}
          onPress={() => navigation.toggleDrawer()}
          pressStyle={PRESS_STYLE}
        />
        <View flex={1} />
        <Button
          unstyled
          p="$2"
          icon={<LayoutGrid size="$1" />}
          onPress={() => null}
          pressStyle={PRESS_STYLE}
        />
      </XStack>
    </HeaderContainer>
  );
};
