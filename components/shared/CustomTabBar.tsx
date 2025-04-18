import * as NavigationBar from 'expo-navigation-bar'
import { type Href, usePathname, useRouter } from 'expo-router'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

import { HIDE_TAB_BAR_ROUTES, TAB_BAR_HEIGHT } from '@/constants'
import { Position } from '@/types'

import { WriteButtonWithEvent } from '@/components/shared/WriteButtonWithEvent'
import { useAxisAnimationWithState } from '@/hooks/useAxisAnimationWithState'
import * as S from './CustomTabBar.styled'
import {
  EntriesTab,
  HomeTab,
  SettingsTab,
  StatisticsTab,
} from './CustomTabBarItems'

const AnimatedTabBar = Animated.createAnimatedComponent(S.TabBarContainer)

export const CustomTabBar = memo(() => {
  const theme = useTheme()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  )

  const {
    state: position,
    animatedStyle,
    changeStateByCondition,
  } = useAxisAnimationWithState('y', {
    defaultState: Position.TOP,
    nextState: Position.BOTTOM,
    startValue: 0,
    endValue: 140,
    duration: 1000,
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        position === Position.BOTTOM ? theme.background.val : theme.color5.val,
      )
    }
  }, [position, theme, pathname])

  useEffect(() => {
    changeStateByCondition(shouldHideTabBar)
  }, [pathname])

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index')
    },
    [pathname],
  )

  const isHomeActive = useMemo(() => isActive('/'), [isActive])
  const isCalendarActive = useMemo(() => isActive('/entries'), [isActive])
  const isStatisticsActive = useMemo(() => isActive('/statistics'), [isActive])
  const isSettingsActive = useMemo(() => isActive('/settings'), [isActive])

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path as Href)
    },
    [router],
  )

  return (
    <AnimatedTabBar
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      style={animatedStyle}
    >
      <S.Container>
        <HomeTab isTabActive={isHomeActive} onPress={handleNavigate} />
        <EntriesTab isTabActive={isCalendarActive} onPress={handleNavigate} />
        <WriteButtonWithEvent />
        <StatisticsTab
          isTabActive={isStatisticsActive}
          onPress={handleNavigate}
        />
        <SettingsTab isTabActive={isSettingsActive} onPress={handleNavigate} />
      </S.Container>
    </AnimatedTabBar>
  )
})
