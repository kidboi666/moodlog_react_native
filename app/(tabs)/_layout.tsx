import * as NavigationBar from 'expo-navigation-bar'
import { Redirect, Tabs, usePathname } from 'expo-router'
import { Fragment, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { AnimatePresence, useTheme } from 'tamagui'

import { HIDE_TAB_BAR_ROUTES } from '@/constants'
import { useApp, useUI } from '@/store'

import { CustomTabBar } from '@/components/features/tab'
import { ContainerFog } from '@/components/shared'

export default function Layout() {
  const pathname = usePathname()
  const theme = useTheme()

  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const setLoading = useUI(state => state.setLoading)
  const isLoading = useUI(state => state.isLoading)
  const isAuthenticated = useApp(state => state.isAuthenticated)

  const [initialized, setInitialized] = useState(false)
  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  )

  useEffect(() => {
    setInitialized(true)
  }, [firstLaunchDate])

  useEffect(() => {
    setLoading(!initialized)
  }, [initialized, setLoading])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        shouldHideTabBar ? theme.background.val : theme.color5.val,
      )
    }
  }, [shouldHideTabBar, theme, pathname])

  if (isLoading) return null

  if (!firstLaunchDate) {
    return <Redirect href='/(onboarding)/welcome' />
  }

  return (
    <Fragment>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
          animation: 'fade',
          sceneStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}
      >
        <Tabs.Screen name='index' />
        <Tabs.Screen name='entries' />
        <Tabs.Screen name='statistics' />
        <Tabs.Screen name='settings' />
        <Tabs.Screen name='journal' />
      </Tabs>
      <ContainerFog shouldHideTabBar={shouldHideTabBar} />
      <AnimatePresence exitBeforeEnter>
        {!shouldHideTabBar && <CustomTabBar />}
      </AnimatePresence>
    </Fragment>
  )
}
