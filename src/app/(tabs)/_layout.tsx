import { Redirect, usePathname, useRouter } from 'expo-router'
import {
  TabList,
  TabSlot,
  TabTrigger,
  Tabs,
  useTabsWithChildren,
} from 'expo-router/ui'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { TabButton } from '@/components/features/tab'
import { ContainerFog } from '@/components/shared'
import { HIDE_TAB_BAR_ROUTES } from '@/constants'
import { Colors } from '@/constants/theme'
import { useAuth } from '@/store'

export default function TabsLayout() {
  const pathname = usePathname()
  const session = useAuth(state => state.session)
  const router = useRouter()
  const tabBarHeight = useSharedValue(0)
  const [shouldHideTabBar, setShouldHideTabBar] = useState(false)
  if (!session) {
    return <Redirect href='/(onboarding)/intro' />
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarHeight.value }],
  }))

  useEffect(() => {
    tabBarHeight.value = withTiming(shouldHideTabBar ? 100 : 0, {
      duration: 600,
      easing: Easing.inOut(Easing.quad),
    })
  }, [shouldHideTabBar])

  useEffect(() => {
    setShouldHideTabBar(
      HIDE_TAB_BAR_ROUTES.some(route => pathname.startsWith(route)),
    )
  }, [pathname])

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

          {/*<WriteButton />*/}
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
