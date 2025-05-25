import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui'
import React from 'react'
import { useTheme } from 'react-native-paper'

import { SurfaceTabList, TabButton } from '@/components/features/tab'

export default function TabsLayout() {
  const theme = useTheme()
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <SurfaceTabList>
          <TabTrigger name='main' href='/' style={{ display: 'none' }} />
          <TabTrigger name='home' href='/home' asChild>
            <TabButton icon='home' />
          </TabTrigger>
          <TabTrigger name='entries' href='/entries' asChild>
            <TabButton icon='book' />
          </TabTrigger>
          <TabTrigger name='write' href='/write' asChild>
            <TabButton
              icon='plus'
              containerColor={theme.colors.primary}
              iconColor={theme.colors.surface}
            />
          </TabTrigger>
          {/*<TabTrigger name='statistic' href='/statistic' asChild>*/}
          {/*  <TabButton icon='chart-bar' />*/}
          {/*</TabTrigger>*/}
          <TabTrigger name='setting' href='/setting' asChild>
            <TabButton icon='cog' />
          </TabTrigger>
        </SurfaceTabList>
      </TabList>
    </Tabs>
  )
}
