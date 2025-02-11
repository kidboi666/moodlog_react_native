import { useTheme, View } from 'tamagui';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Home, PersonStanding, Settings } from '@tamagui/lucide-icons';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { state, descriptors } = props;
  const router = useRouter();
  const theme = useTheme();

  const handleNavigation = (routeName: string) => {
    if (routeName.toLowerCase() === 'index') {
      router.push('/');
    } else {
      router.push(`/${routeName}` as never);
    }
  };

  const iconList = {
    index: focused => (
      <Home color={focused ? '$gray12' : '$gray10'} size="$1" />
    ),
    profile: focused => (
      <PersonStanding color={focused ? '$gray12' : '$gray10'} size="$1" />
    ),
    settings: focused => (
      <Settings color={focused ? '$gray12' : '$gray10'} size="$1" />
    ),
  };

  return (
    <View flex={1} bg="$background">
      <DrawerContentScrollView>
        {state.routes.map((route, i) => (
          <DrawerItem
            key={route.name}
            focused={state.index === i}
            activeBackgroundColor={theme.gray8.val}
            activeTintColor={theme.gray12.val}
            inactiveTintColor={theme.gray11.val}
            icon={({ focused }) => iconList[route.name](focused)}
            label={descriptors[route.key].options.title ?? route.name}
            onPress={() => handleNavigation(route.name)}
          />
        ))}
      </DrawerContentScrollView>
    </View>
  );
};
