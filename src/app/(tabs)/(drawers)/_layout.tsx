import { DrawerContent } from '@/components/drawers/DrawerContent';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <Drawer
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => <HomeHeader navigation={navigation} />,
      }}
    >
      <Drawer.Screen
        name="index"
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
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Drawer>
  );
}
