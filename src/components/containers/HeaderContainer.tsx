import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps, XStack } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { useScroll } from '@/store/hooks/useScroll';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

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

    return {
      shadowOffset: {
        width: 0,
        height: withTiming(scrollPosition > 1 ? 2 : 0),
      },
      shadowOpacity: withTiming(scrollPosition > 1 ? 0.3 : 0),
      shadowRadius: withTiming(scrollPosition > 1 ? 3 : 0),
      elevation: withTiming(elevation),
    };
  });

  return (
    <AnimatedView
      animation="quick"
      bg="$background"
      shadowColor="$gray11"
      style={animatedStyle}
    >
      <XStack
        px={CONTAINER_SPACING}
        py={CONTAINER_SPACING / 2}
        justify="space-between"
        {...safeAreaMargins}
        {...props}
      >
        {children}
      </XStack>
    </AnimatedView>
  );
};
