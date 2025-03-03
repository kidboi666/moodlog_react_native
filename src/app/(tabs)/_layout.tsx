import { Stack } from 'tamagui';
import React from 'react';
import { Slot } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';

export default function TabsLayout() {
  return (
    <Stack flex={1} pb="$8">
      <Slot />
      <CustomTabBar />
    </Stack>
  );
}
