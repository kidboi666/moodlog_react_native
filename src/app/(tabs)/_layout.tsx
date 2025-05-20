import { Redirect, Tabs, usePathname } from 'expo-router'
import React, { Fragment, useEffect, useState } from 'react'

import { CustomTabBar } from '@/components/features/tab'
import { ContainerFog } from '@/components/shared'
import { HIDE_TAB_BAR_ROUTES } from '@/constants'
import { useAuth } from '@/store'

export default function TabsLayout() {
  const pathname = usePathname()
  const session = useAuth(state => state.session)
  const [shouldHideTabBar, setShouldHideTabBar] = useState(false)

  if (!session) {
    return <Redirect href='/(onboarding)/intro' />
  }

  useEffect(() => {
    setShouldHideTabBar(
      HIDE_TAB_BAR_ROUTES.some(route => pathname.startsWith(route)),
    )
  }, [pathname])

  return (
    <Fragment>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          sceneStyle: { backgroundColor: 'transparent' },
          freezeOnBlur: false,
        }}
      >
        <Tabs.Screen name='index' />
        <Tabs.Screen name='entries' />
        <Tabs.Screen name='journal' />
        <Tabs.Screen name='setting' />
        <Tabs.Screen name='statistic' />
      </Tabs>
      <ContainerFog />
      <CustomTabBar shouldHideTabBar={shouldHideTabBar} />
    </Fragment>
  )
}
