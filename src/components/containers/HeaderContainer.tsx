import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps, XStack } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useScroll } from '@/store/hooks/useScroll';
import { Platform } from 'react-native';

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
}

export const HeaderContainer = ({
  children,
  edges = ['top'],
  ...props
}: Props) => {
  const insets = useSafeAreaInsets();
  const { scrollPosition } = useScroll();

  const safeAreaMargins = {
    mt: edges.includes('top') ? insets.top : 0,
    mb: edges.includes('bottom') ? insets.bottom : 0,
  };

  const animatedStyle = useAnimatedStyle(() => {
    const elevation = interpolate(scrollPosition, [0, 1], [0, 5], 'clamp');

    if (Platform.OS === 'ios') {
      return {
        shadowOffset: {
          width: 0,
          height: withTiming(scrollPosition > 1 ? 5 : 0),
        },
        shadowOpacity: withTiming(scrollPosition > 1 ? 0.3 : 0),
        shadowRadius: withTiming(scrollPosition > 1 ? 3 : 0),
        elevation: withTiming(elevation),
      };
    }

    return {
      elevation: withTiming(elevation),
    };
  });

  return (
    <AnimatedXStack
      animation="quick"
      style={animatedStyle}
      bg="$background"
      shadowColor="$gray11"
      px={CONTAINER_SPACING}
      py={CONTAINER_SPACING / 2}
      justify="space-between"
      {...safeAreaMargins}
      {...props}
    >
      {children}
    </AnimatedXStack>
  );
};
