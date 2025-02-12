import { Button, useTheme } from 'tamagui';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Home, PersonStanding, Settings, X } from '@tamagui/lucide-icons';

const iconList = {
  index: focused => <Home color={focused ? '$gray12' : '$gray10'} size="$1" />,
  profile: focused => (
    <PersonStanding color={focused ? '$gray12' : '$gray10'} size="$1" />
  ),
  settings: focused => (
    <Settings color={focused ? '$gray12' : '$gray10'} size="$1" />
  ),
};

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { state, navigation, descriptors } = props;
  const router = useRouter();
  const theme = useTheme();

  const handleNavigation = (routeName: string) => {
    if (routeName.toLowerCase() === 'index') {
      router.push('/');
    } else {
      router.push(`/${routeName}` as never);
    }
  };

  return (
    <DrawerContentScrollView>
      <Button
        onPress={() => navigation.closeDrawer()}
        icon={X}
        size="$3"
        self="flex-start"
        mb="$4"
      />
      {state.routes.map((route, i) => (
        <DrawerItem
          key={route.name}
          focused={state.index === i}
          activeBackgroundColor={theme.gray8.val}
          activeTintColor={theme.gray12.val}
          inactiveTintColor={theme.gray11.val}
          icon={({ focused }) => iconList[route.name](focused)}
          label={descriptors[route.key].options.title ?? route.name}
          style={{
            width: '100%',
            borderRadius: 12,
          }}
          onPress={() => handleNavigation(route.name)}
        />
      ))}
    </DrawerContentScrollView>
  );
};
