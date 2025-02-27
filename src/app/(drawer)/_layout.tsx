import { DrawerContent } from '@/components/DrawerContent';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { Drawer } from 'expo-router/drawer';
import { Floating } from '@/components/Floating';
import { useTheme } from 'tamagui';

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <>
      <Drawer
        initialRouteName="index"
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          header: ({ navigation }) => <HomeHeader navigation={navigation} />,
          sceneStyle: { backgroundColor: theme.background.val },
          drawerStyle: { backgroundColor: theme.background.val },
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="profile" />
        <Drawer.Screen
          name="(settings)"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
      <Floating />
    </>
  );
}
