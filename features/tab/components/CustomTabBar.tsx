import { type Href, usePathname, useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { XStack, styled } from 'tamagui'

import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  TAB_BAR_HEIGHT,
} from '@/shared/constants'
import {
  CalendarTab,
  HomeTab,
  SettingTab,
  StatisticTab,
} from './CustomTabBarItems'
import { WriteButton } from './WriteButton'

export const CustomTabBar = () => {
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index')
    },
    [pathname],
  )

  const isHomeActive = useMemo(() => isActive('/'), [isActive])
  const isCalendarActive = useMemo(() => isActive('/calendar'), [isActive])
  const isStatisticActive = useMemo(() => isActive('/statistic'), [isActive])
  const isSettingActive = useMemo(() => isActive('/setting'), [isActive])

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path as Href)
    },
    [router],
  )

  return (
    <>
      <StyledContainer
        height={TAB_BAR_HEIGHT + insets.bottom}
        pb={insets.bottom}
        pt={Platform.OS === 'ios' ? '$4' : undefined}
      >
        <HomeTab isTabActive={isHomeActive} onPress={handleNavigate} />
        <CalendarTab isTabActive={isCalendarActive} onPress={handleNavigate} />
        <WriteButton />
        <StatisticTab
          isTabActive={isStatisticActive}
          onPress={handleNavigate}
        />
        <SettingTab isTabActive={isSettingActive} onPress={handleNavigate} />
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled(XStack, {
  position: 'absolute',
  b: 0,
  l: 0,
  r: 0,
  z: 100,
  bg: '$color5',
  borderTopRightRadius: '$10',
  borderTopLeftRadius: '$10',
  width: '100%',
  flex: 1,
  justify: 'space-evenly',
  items: 'center',
  elevation: '$8',

  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
})
