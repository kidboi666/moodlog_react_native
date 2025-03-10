import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';
import { ContainerFog } from '@/components/ContainerFog';
import React from 'react';
import { CustomTabBar } from '@/components/CustomTabBar';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <ContainerFog />
      <CustomTabBar />
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="entries" href="/entries" />
        <TabTrigger name="write" href="/write/mood_select" />
        <TabTrigger name="record" href="/record" />
        <TabTrigger name="settings" href="/settings" />
        <TabTrigger name="journal" href="/journal/[journalId]" />
      </TabList>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </Tabs>
  );
}
