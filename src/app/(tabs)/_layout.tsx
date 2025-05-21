import { Redirect } from 'expo-router'
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { TabButton, WriteButton } from '@/components/features/tab'
import { ContainerFog } from '@/components/shared'
import { Colors } from '@/constants/theme'
import { useAuth } from '@/store'

export default function TabsLayout() {
  const session = useAuth(state => state.session)
  const tabBarHeight = useSharedValue(0)

  if (!session) {
    return <Redirect href='/(onboarding)/intro' />
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarHeight.value }],
  }))

  return (
    <>
      <Tabs>
        <TabSlot />
        <TabList style={[animatedStyle, styles.list]}>
          <TabTrigger name='home' href='/' asChild>
            <TabButton icon='home' />
          </TabTrigger>
          <TabTrigger name='entries' href='/entries' asChild>
            <TabButton icon='book' />
          </TabTrigger>

          <WriteButton />
          <TabTrigger name='statistic' href='/statistic' asChild>
            <TabButton icon='stats-chart' />
          </TabTrigger>
          <TabTrigger name='setting' href='/setting' asChild>
            <TabButton icon='settings' />
          </TabTrigger>
        </TabList>
      </Tabs>
      <ContainerFog />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    bottom: 14,
    backgroundColor: Colors.gray4,
    borderRadius: 40,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    elevation: 10,
  },
})
