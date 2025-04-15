import { Redirect, Tabs, usePathname } from 'expo-router'
import { useEffect, useState } from 'react'

import { ContainerFog } from '@/core/components/shared/ContainerFog'
import { CustomTabBar } from '@/core/components/shared/CustomTabBar'
import { FullScreenSpinner } from '@/core/components/shared/FullScreenSpinner'
import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes'
import { useApp } from '@/core/store/app.store'
import { useUI } from '@/core/store/ui.store'

export default function Layout() {
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const appIsLoading = useApp(state => state.isLoading)
  const setLoading = useUI(state => state.setLoading)
  const isLoading = useUI(state => state.isLoading)
  const [initialized, setInitialized] = useState(false)
  const pathname = usePathname()
  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  )

  useEffect(() => {
    setInitialized(true)
  }, [firstLaunchDate])

  useEffect(() => {
    setLoading(!initialized || appIsLoading)
    return () => {
      setLoading(false)
    }
  }, [initialized, appIsLoading, setLoading])

  if (isLoading) return null

  if (!firstLaunchDate) {
    return <Redirect href='/(onboarding)/welcome' />
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
        <Tabs.Screen name='index' />
        <Tabs.Screen name='entries' />
        <Tabs.Screen name='statistics' />
        <Tabs.Screen name='settings' />
        <Tabs.Screen
          name='journal'
          options={{
            href: null,
          }}
        />
      </Tabs>
      <ContainerFog />
      {!shouldHideTabBar && <CustomTabBar />}
      <FullScreenSpinner size='large' />
    </>
  )
}
