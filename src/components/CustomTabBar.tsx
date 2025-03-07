import { Button, Circle, getToken, Stack, useTheme } from 'tamagui';
import { Href, usePathname, useRouter } from 'expo-router';
import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Plus,
  Settings,
} from '@tamagui/lucide-icons';
import {
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/styles';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { TAB_BAR_HEIGHT } from '@/constants/size';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { HIDE_TAB_BAR_ROUTES } from '@/constants/routes';
import * as NavigationBar from 'expo-navigation-bar';

const AnimatedStack = Animated.createAnimatedComponent(Stack);

const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

export const CustomTabBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { draft } = useDraft();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  const shouldHideTabBar = useMemo(
    () => HIDE_TAB_BAR_ROUTES.some(route => pathname.startsWith(route)),
    [pathname],
  );

  useEffect(() => {
    translateY.value = withTiming(
      shouldHideTabBar ? TAB_BAR_HEIGHT + insets.bottom : 0,
      ANIMATION_CONFIG,
    );

    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        shouldHideTabBar ? theme.background.val : theme.gray5.val,
      );
    }
  }, [pathname, shouldHideTabBar, theme, insets.bottom, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path as Href);
    },
    [router],
  );

  const showDraftNotification = useMemo(
    () => Boolean(draft.content || draft.emotion?.type),
    [draft.content, draft.emotion?.type],
  );

  const isActive = useCallback(
    (path: string) => {
      return pathname === path || (path === '/' && pathname === '/index');
    },
    [pathname],
  );

  const tabBarButtons = useMemo(
    () => (
      <Stack
        flex={1}
        pt={Platform.OS === 'ios' ? '$4' : undefined}
        flexDirection="row"
        justify="space-evenly"
        items="center"
      >
        {/* Home 탭 */}
        <Button
          unstyled
          p="$4"
          rounded="$4"
          borderTopLeftRadius="$10"
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          pressStyle={PRESS_STYLE}
          onPress={() => navigateTo('/')}
          color={isActive('/') ? '$gray12' : '$gray10'}
          icon={<Home size="$1" />}
        />
        {/* Calendar 탭 */}
        <Button
          unstyled
          p="$4"
          rounded="$4"
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          pressStyle={PRESS_STYLE}
          onPress={() => navigateTo('/calendar')}
          color={isActive('/calendar') ? '$gray12' : '$gray11'}
          icon={<CalendarDays size="$1" />}
        />

        {/* Write 탭 */}
        <Button
          unstyled
          p="$4"
          bg="$gray1"
          rounded="$4"
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          pressStyle={PRESS_STYLE}
          color="$gray10"
          onPress={() => navigateTo('/write')}
          icon={<Plus size="$1" />}
        >
          {showDraftNotification && (
            <Circle
              position="absolute"
              l={8}
              t={8}
              rounded="$4"
              bg="$green9"
              size="$0.75"
            />
          )}
        </Button>

        {/* Record 탭 */}
        <Button
          unstyled
          p="$4"
          rounded="$4"
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          pressStyle={PRESS_STYLE}
          onPress={() => navigateTo('/record')}
          color={isActive('/record') ? '$gray12' : '$gray10'}
          icon={<FileChartColumnIncreasing size="$1" />}
        />
        {/* Settings 탭 */}
        <Button
          unstyled
          p="$4"
          rounded="$4"
          borderTopRightRadius="$10"
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          pressStyle={PRESS_STYLE}
          onPress={() => navigateTo('/settings')}
          color={isActive('/settings') ? '$gray12' : '$gray11'}
          icon={<Settings size="$1" />}
        />
      </Stack>
    ),
    [navigateTo, isActive, showDraftNotification],
  );

  return (
    <AnimatedStack
      shadowColor="$shadowColor"
      shadowOpacity={0.1}
      shadowRadius="$4"
      shadowOffset={{ width: 0, height: -3 }}
      position="absolute"
      b={0}
      l={0}
      r={0}
      animation="medium"
      animateOnly={ENTER_STYLE_KEY}
      enterStyle={ENTER_STYLE}
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      flexDirection="row"
      bg={theme.gray5.val as any}
      borderTopRightRadius={getToken('$12')}
      borderTopLeftRadius={getToken('$12')}
      style={animatedStyle}
    >
      {tabBarButtons}
    </AnimatedStack>
  );
};
