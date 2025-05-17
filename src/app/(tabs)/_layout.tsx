import { Redirect, Tabs, usePathname } from 'expo-router'
import React, { Fragment } from 'react'
import { AnimatePresence } from 'tamagui'

import { CustomTabBar } from '@/components/features/tab'
import { ContainerFog } from '@/components/shared'
import { HIDE_TAB_BAR_ROUTES } from '@/constants'
import { useAuth } from '@/store'

export default function TabsLayout() {
  const pathname = usePathname()
  const session = useAuth(state => state.session)

  if (!session) {
    return <Redirect href='/(onboarding)/intro' />
  }

  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  )

  return (
    <Fragment>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          animation: 'fade',
          sceneStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Tabs.Screen name='index' />
        <Tabs.Screen name='entries' />
        <Tabs.Screen name='journal' />
        <Tabs.Screen name='setting' />
        <Tabs.Screen name='statistic' />
      </Tabs>
      <ContainerFog />
      <AnimatePresence exitBeforeEnter>
        {!shouldHideTabBar && <CustomTabBar />}
      </AnimatePresence>
    </Fragment>
  )
}
