import { Button, View } from 'tamagui';
import { LayoutGrid, Menu } from '@tamagui/lucide-icons';
import { PRESS_STYLE } from '@/constants/styles';
import { HeaderContainer } from '@/components/containers/HeaderContainer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/routers';

export const HomeHeader = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
}) => {
  return (
    <HeaderContainer>
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
        onPress={() => navigation.navigate('(record)')}
        pressStyle={PRESS_STYLE}
      />
    </HeaderContainer>
  );
};
