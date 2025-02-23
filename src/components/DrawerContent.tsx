import { Button, Separator, Text, useTheme, View, XStack } from 'tamagui';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Home, PersonStanding, Settings, X } from '@tamagui/lucide-icons';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { PRESS_STYLE } from '@/constants/styles';
import { DrawerContainer } from '@/components/containers/DrawerContainer';
import { DevButtonsWithDrawerContext } from '@/components/DevButtonsWithDrawerContext';
import { useTranslation } from 'react-i18next';

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
  const iconList = {
    index: <Home color={theme.gray10.val as any} size="$1" />,
    profile: <PersonStanding color={theme.gray10.val as any} size="$1" />,
    setting: <Settings color={theme.gray10.val as any} size="$1" />,
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
          <Button
            key={i}
            icon={iconList[route.name]}
            onPress={() => handleNavigation(route.name)}
          >
            {descriptors[route.key].options.title ?? route.name}
          </Button>
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
