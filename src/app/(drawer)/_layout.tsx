import { DrawerContent } from '@/components/features/drawer/DrawerContent';
import { HomeHeader } from '@/components/layouts/headers/HomeHeader';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from 'tamagui';

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <>
      <Drawer
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          header: ({ navigation }) => <HomeHeader navigation={navigation} />,
          sceneStyle: { backgroundColor: theme.background.val },
          drawerStyle: { backgroundColor: theme.background.val },
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen
          name="(settings)"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
    </>
  );
}
