import { useEffect, useState } from 'react';

import { Redirect, Tabs } from 'expo-router';

import { ContainerFog } from '@/core/components/shared/ContainerFog';
import { CustomTabBar } from '@/core/components/shared/CustomTabBar';
import { FullSpinner } from '@/core/components/shared/FullSpinner';
import { useApp } from '@/core/store/app.store';
import { useJournal } from '@/core/store/journal.store';

export default function Layout() {
  const firstLaunchDate = useApp(state => state.firstLaunchDate);
  const isLoading = useApp(state => state.isLoading);
  const initAppData = useApp(state => state.initAppData);
  const initJournals = useJournal(state => state.initJournals);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await initAppData();
      await initJournals();
      setInitialized(true);
    };

    initApp();
  }, [initAppData, initJournals]);

  if (!initialized || isLoading) {
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
          name="journal"
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
