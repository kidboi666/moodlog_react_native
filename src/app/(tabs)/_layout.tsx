import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';
import { ContainerFog } from '@/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/components/layouts/tab/CustomTabBar';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <ContainerFog />
      <CustomTabBar />
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="calendar" href="/calendar" />
        <TabTrigger name="write" href="/write/mood_select" />
        <TabTrigger name="record" href="/record" />
        <TabTrigger name="settings" href="/settings" />
      </TabList>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </Tabs>
  );
}
