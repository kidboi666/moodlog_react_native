import { Button, Circle, getToken, Stack, useTheme } from 'tamagui';
import { Href, usePathname, useRouter } from 'expo-router';
import {
  FileChartColumnIncreasing,
  Home,
  Plus,
  Settings,
} from '@tamagui/lucide-icons';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import React, { useEffect } from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { TAB_BAR_HEIGHT } from '@/constants/size';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedStack = Animated.createAnimatedComponent(Stack);

export const CustomTabBar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { draft } = useDraft();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (pathname.startsWith('/write')) {
      // write 페이지일 때 아래로 사라지게 함
      translateY.value = withTiming(TAB_BAR_HEIGHT + insets.bottom, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      // 다른 페이지에서는 보이게 함
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [pathname, insets.bottom]);

  // 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // 탭 네비게이션 함수
  const navigateTo = (path: string) => {
    router.push(path as Href);
  };

  // 현재 활성화된 탭 확인
  const isActive = (path: string) => {
    return pathname === path || (path === '/' && pathname === '/index');
  };

  return (
    <AnimatedStack
      position="absolute"
      b={0}
      l={0}
      r={0}
      height={TAB_BAR_HEIGHT + insets.bottom}
      pb={insets.bottom}
      flexDirection="row"
      bg={theme.gray5.val as any}
      borderTopRightRadius={getToken('$8')}
      borderTopLeftRadius={getToken('$8')}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: -3 }}
      shadowOpacity={0.04}
      shadowRadius={3}
      style={animatedStyle}
    >
      <Stack flex={1} flexDirection="row" justify="space-around" items="center">
        {/* Home 탭 */}
        <Button
          unstyled
          justify="center"
          items="center"
          p="$4"
          animation="bouncy"
          animateOnly={['color', ...ENTER_STYLE_KEY]}
          enterStyle={ENTER_STYLE}
          onPress={() => navigateTo('/')}
          pressStyle={PRESS_STYLE}
          color={isActive('/') ? '$gray12' : '$gray10'}
          icon={<Home size="$1" />}
        />

        {/* Record 탭 */}
        <Button
          unstyled
          justify="center"
          items="center"
          p="$4"
          rounded="$8"
          animation="quick"
          animateOnly={['color', ...ENTER_STYLE_KEY]}
          enterStyle={ENTER_STYLE}
          onPress={() => navigateTo('/record')}
          pressStyle={PRESS_STYLE}
          color={isActive('/record') ? '$gray12' : '$gray10'}
          icon={<FileChartColumnIncreasing size="$1" />}
        />

        {/* Write 탭 */}
        <Button
          unstyled
          p="$4"
          items="center"
          rounded="$8"
          bg="$gray1"
          onPress={() => navigateTo('/write')}
          animation="bouncy"
          animateOnly={['color', ...ENTER_STYLE_KEY]}
          enterStyle={ENTER_STYLE}
          pressStyle={PRESS_STYLE}
          color="$gray10"
          icon={<Plus size="$1" />}
        >
          {(draft.content || draft.emotion?.type) && (
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

        {/* Settings 탭 */}
        <Button
          unstyled
          justify="center"
          items="center"
          p="$4"
          animation="bouncy"
          animateOnly={['color', ...ENTER_STYLE_KEY]}
          enterStyle={ENTER_STYLE}
          onPress={() => navigateTo('/settings')}
          pressStyle={PRESS_STYLE}
          color={isActive('/settings') ? '$gray12' : '$gray11'}
          icon={<Settings size="$1" />}
        />
      </Stack>
    </AnimatedStack>
  );
};
