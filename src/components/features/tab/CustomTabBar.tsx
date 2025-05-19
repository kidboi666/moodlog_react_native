import { type Href, usePathname, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useMemo } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { XStack, styled } from 'tamagui'

import {
  EntriesTab,
  HomeTab,
  SettingTab,
  StatisticTab,
} from './CustomTabBarItems'
import { WriteButton } from './WriteButton'

interface Props {
  shouldHideTabBar: boolean
}

export function CustomTabBar({ shouldHideTabBar }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const tabBarHeight = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarHeight.value }],
  }))

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index')
    },
    [pathname],
  )

  const isHomeActive = useMemo(() => isActive('/'), [isActive])
  const isCalendarActive = useMemo(() => isActive('/entries'), [isActive])
  const isStatisticActive = useMemo(() => isActive('/statistic'), [isActive])
  const isSettingActive = useMemo(() => isActive('/setting'), [isActive])

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path as Href)
    },
    [router],
  )

  useEffect(() => {
    tabBarHeight.value = withTiming(shouldHideTabBar ? 100 : 0, {
      duration: 600,
      easing: Easing.inOut(Easing.quad),
    })
  }, [shouldHideTabBar])

  return (
    <Animated.View style={animatedStyle}>
      <StyledContainer>
        <HomeTab isTabActive={isHomeActive} onPress={handleNavigate} />
        <EntriesTab isTabActive={isCalendarActive} onPress={handleNavigate} />
        <WriteButton />
        <StatisticTab
          isTabActive={isStatisticActive}
          onPress={handleNavigate}
        />
        <SettingTab isTabActive={isSettingActive} onPress={handleNavigate} />
      </StyledContainer>
    </Animated.View>
  )
}

const StyledContainer = styled(XStack, {
  bg: '$color5',
  rounded: '$10',
  justify: 'space-evenly',
  items: 'center',
  py: '$3',
  mb: '$2',
  elevation: '$4',
})
