import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps, XStack } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { useSharedValue } from 'react-native-reanimated';
import { useEffect } from 'react';

interface Props extends ViewProps {
  edges?: Array<'top' | 'bottom'>;
}

export const HeaderContainer = ({
  children,
  edges = ['top'],
  ...props
}: Props) => {
  const insets = useSafeAreaInsets();
  const isInitialRender = useSharedValue(true);

  const safeAreaMargins = {
    mt: edges.includes('top') ? insets.top : 0,
    mb: edges.includes('bottom') ? insets.bottom : 0,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      isInitialRender.value = false;
    }, 300);

    return () => clearTimeout(timer);
  });
  return (
    <XStack
      animation="quick"
      px={CONTAINER_SPACING}
      py={CONTAINER_SPACING / 2}
      justify="space-between"
      {...safeAreaMargins}
      {...props}
    >
      {children}
    </XStack>
  );
};
