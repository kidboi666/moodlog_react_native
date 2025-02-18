import { DrawerContent } from '@/components/DrawerContent';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Floating } from '@/components/Floating';
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
      </Drawer>
      <Floating />
    </>
  );
}
