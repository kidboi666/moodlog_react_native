import { DrawerContent } from '@/components/DrawerContent';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function HomeLayout() {
  return (
    <>
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
    </>
  );
}
