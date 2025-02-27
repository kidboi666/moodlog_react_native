import {
  Button,
  GetProps,
  Separator,
  Text,
  useTheme,
  View,
  XStack,
} from 'tamagui';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter, useSegments } from 'expo-router';
import { Home, Settings, X } from '@tamagui/lucide-icons';
import { PRESS_STYLE } from '@/constants/styles';
import { DevButtonsWithDrawerContext } from '@/components/DevButtonsWithDrawerContext';
import { useTranslation } from 'react-i18next';
import { DrawerContainer } from '@/components/layouts/containers/DrawerContainer';
import { DrawerItem } from '@/components/features/drawer/DrawerItem';
import { useApp } from '@/store/hooks/useApp';

export type RouteNames = 'index' | '(settings)';
export type ButtonProps = GetProps<typeof Button>;
export type IconProp = ButtonProps['icon'];
export type IconRenderer = (isSelected: boolean) => IconProp;

const createIconMap = (theme: any): Record<RouteNames, IconRenderer> => ({
  index: (isSelected: boolean) => (
    <Home color={isSelected ? theme.gray1 : theme.gray12} size="$1" />
  ),
  '(settings)': (isSelected: boolean) => (
    <Settings color={isSelected ? theme.gray1 : theme.gray12} size="$1" />
  ),
});

export const DrawerContent = ({
  state,
  navigation,
}: DrawerContentComponentProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { appVersion } = useApp();
  const segments = useSegments();
  const { t } = useTranslation();

  const handleNavigation = (routeName: string) => {
    if (routeName === 'index') {
      router.push('/');
    } else {
      router.push(`/${routeName}` as never);
    }
  };

  const iconList = createIconMap(theme);

  const getCurrentPage = (routeName: string): boolean => {
    return segments[segments.length - 1] === routeName;
  };

  return (
    <DrawerContainer>
      <Button
        unstyled
        py="$2"
        px="$4"
        rounded="$2"
        bg="transparent"
        self="flex-start"
        mb="$3"
        icon={<X size="$1" />}
        pressStyle={PRESS_STYLE}
        onPress={() => navigation.closeDrawer()}
      />

      <View flex={1} height="100%">
        {state.routes.map((route, i) => {
          const routeName = route.name as RouteNames;
          const isSelected = getCurrentPage(routeName);

          return (
            <DrawerItem
              key={i}
              icon={iconList[routeName] || (() => null)}
              isSelected={isSelected}
              onPress={() => handleNavigation(routeName)}
              label={t(`navigation.drawer.${routeName}`)}
            />
          );
        })}

        <Separator my="$4" />

        {__DEV__ && <DevButtonsWithDrawerContext />}
      </View>

      <XStack p="$4">
        <Text color="$gray11" fontWeight="500">
          {appVersion}
        </Text>
      </XStack>
    </DrawerContainer>
  );
};
