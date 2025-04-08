import { useEffect } from 'react';

import { Redirect, Tabs } from 'expo-router';

import { ContainerFog } from '@/core/components/shared/ContainerFog';
import { CustomTabBar } from '@/core/components/shared/CustomTabBar';
import { FullSpinner } from '@/core/components/shared/FullSpinner';
import { useApp } from '@/core/store/contexts/app.context';

export default function Layout() {
  const { initAppData, isInitialApp, firstLaunchDate, isLoading } = useApp();

  useEffect(() => {
    initAppData();
  }, [initAppData]);

  if (isLoading || !isInitialApp) {
    return <FullSpinner size="large" />;
  }

  if (!firstLaunchDate) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
          animation: 'fade',
          sceneStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="entries" />
        <Tabs.Screen name="statistics" />
        <Tabs.Screen name="settings" />
        <Tabs.Screen
          name="journal/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <ContainerFog />
      <CustomTabBar />
    </>
  );
}
