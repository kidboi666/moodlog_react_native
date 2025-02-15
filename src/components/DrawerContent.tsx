import {
  Button,
  Label,
  Separator,
  Switch,
  Text,
  useTheme,
  View,
  XStack,
} from 'tamagui';
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Home, PersonStanding, Settings, Sun, X } from '@tamagui/lucide-icons';
import { useThemeContext } from '@/store/hooks/useThemeContext';
import { ContainerWithSafeAreaView } from '@/components/Container';

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
  settings: (focused, theme) => (
    <Settings color={focused ? theme.gray12.val : theme.gray10.val} size="$1" />
  ),
};

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { state, navigation, descriptors } = props;
  const { currentTheme, toggleTheme } = useThemeContext();
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
    <ContainerWithSafeAreaView edges={['top', 'bottom']}>
      <Button
        p="$2"
        animation="quick"
        rounded="$2"
        bg="transparent"
        self="flex-start"
        mt="$3"
        mb="$4"
        color="$gray11"
        icon={<X size="$1" />}
        onPress={() => navigation.closeDrawer()}
        pressStyle={{
          bg: '$background',
        }}
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
      </View>

      <DrawerItem
        icon={() => <Sun color="$gray10" size="$1" />}
        label={() => (
          <XStack width="100%" justify="space-between" items="center">
            <Label
              lineHeight={24}
              verticalAlign="center"
              color="$gray11"
              htmlFor="darkmode"
              fontWeight="500"
              flex={1}
            >
              Dark Mode
            </Label>
            <Switch
              id="darkmode"
              checked={currentTheme === 'dark'}
              onCheckedChange={toggleTheme}
              bg={currentTheme === 'dark' ? '$green10' : '$gray7'}
              borderColor={currentTheme === 'dark' ? '$green10' : '$gray7'}
            >
              <Switch.Thumb
                animation="quick"
                bg={currentTheme === 'dark' ? '$gray4' : '$gray1'}
              />
            </Switch>
          </XStack>
        )}
        onPress={() => null}
      />
      <Separator my="$4" />

      <XStack p="$4">
        <Text color="$gray11" fontWeight="500">
          Guest Mode
        </Text>
      </XStack>
    </ContainerWithSafeAreaView>
  );
};
