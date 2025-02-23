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
        initialRouteName="home"
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          header: ({ navigation }) => <HomeHeader navigation={navigation} />,
          sceneStyle: { backgroundColor: theme.background.val },
          drawerStyle: { backgroundColor: theme.background.val },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="(setting)"
          options={{
            headerShown: false,
            title: 'Setting',
          }}
        />
      </Drawer>
      <Floating />
    </>
  );
}
