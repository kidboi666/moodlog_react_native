import { Button, Separator, Text, View, XStack } from 'tamagui';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter, useSegments } from 'expo-router';
import { Home, PersonStanding, Settings, X } from '@tamagui/lucide-icons';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { DrawerContainer } from '@/components/containers/DrawerContainer';
import { DevButtonsWithDrawerContext } from '@/components/DevButtonsWithDrawerContext';
import { useTranslation } from 'react-i18next';

export const DrawerContent = ({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) => {
  const router = useRouter();
  const segments = useSegments();
  const { t } = useTranslation();

  const handleNavigation = (routeName: string) => {
    router.push(`/${routeName}` as never);
  };

  const iconList = {
    home: (color: any) => <Home color={color} size="$1" />,
    profile: (color: any) => <PersonStanding color={color} size="$1" />,
    '(setting)': (color: any) => <Settings color={color} size="$1" />,
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
        onPress={() => navigation.closeDrawer()}
        pressStyle={PRESS_STYLE}
      />
      <View flex={1} height="100%">
        {state.routes.map((route, i) => {
          const samePage = segments[segments.length - 1] === route.name;
          return (
            <Button
              unstyled
              key={i}
              animation="quick"
              animateOnly={PRESS_STYLE_KEY}
              pressStyle={PRESS_STYLE}
              flexDirection="row"
              items="center"
              fontSize="$5"
              p="$4"
              gap="$1"
              justify="flex-start"
              rounded="$4"
              color={samePage ? '$gray1' : '$gray12'}
              bg={samePage ? '$gray12' : 'transparent'}
              icon={iconList[route.name](samePage ? '$gray1' : '$gray12')}
              onPress={() => handleNavigation(route.name)}
            >
              {t(`navigation.drawer.${route.name}`)}
            </Button>
          );
        })}
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
