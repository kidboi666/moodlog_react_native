import { Button, Separator, Text, useTheme, View, XStack } from 'tamagui';
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Home, PersonStanding, Settings, X } from '@tamagui/lucide-icons';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { PRESS_STYLE } from '@/constants/styles';
import { DrawerContainer } from '@/components/containers/DrawerContainer';
import { DevButtonsWithDrawerContext } from '@/components/DevButtonsWithDrawerContext';
import { useTranslation } from 'react-i18next';

const iconList = {
  index: (focused, theme) => (
    <Home color={focused ? theme.gray12.val : theme.gray10.val} size="$1" />
  ),
  profile: (focused, theme) => (
    <PersonStanding
      color={focused ? theme.gray12.val : theme.gray10.val}
      size="$1"
    />
  ),
  setting: (focused, theme) => (
    <Settings color={focused ? theme.gray12.val : theme.gray10.val} size="$1" />
  ),
};

export const DrawerContent = ({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) => {
  const { currentTheme, toggleTheme } = useAppTheme();
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();

  const handleNavigation = (routeName: string) => {
    if (routeName.toLowerCase() === 'index') {
      router.push('/');
    } else {
      router.push(`/${routeName}` as never);
    }
  };

  return (
    <DrawerContainer>
      <Button
        unstyled
        p="$2"
        rounded="$2"
        bg="transparent"
        self="flex-start"
        mb="$3"
        icon={<X size="$1" />}
        onPress={() => navigation.closeDrawer()}
        pressStyle={PRESS_STYLE}
      />
      <View flex={1} height="100%">
        {state.routes.map((route, i) => (
          <DrawerItem
            key={route.name}
            focused={state.index === i}
            activeBackgroundColor={theme.gray8.val}
            activeTintColor={theme.gray12.val}
            inactiveTintColor={theme.gray11.val}
            icon={({ focused }) => iconList[route.name](focused, theme)}
            label={descriptors[route.key].options.title ?? route.name}
            style={{
              width: '100%',
              borderRadius: 12,
            }}
            onPress={() => handleNavigation(route.name)}
          />
        ))}
        <Separator my="$4" />

        {__DEV__ && <DevButtonsWithDrawerContext />}
      </View>

      <XStack p="$4">
        <Text color="$gray11" fontWeight="500">
          Guest Mode
        </Text>
      </XStack>
    </DrawerContainer>
  );
};
