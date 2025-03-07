import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack, XStackProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { Platform } from 'react-native';

interface Props extends XStackProps {
  edges?: Array<'top' | 'bottom'>;
}

export const HeaderContainer = ({
  children,
  edges = ['top'],
  ...props
}: Props) => {
  const insets = useSafeAreaInsets();

  const safeAreaMargins = {
    mt: edges.includes('top') ? insets.top : 0,
    mb: edges.includes('bottom') ? insets.bottom : 0,
  };

  return (
    <XStack
      pt={Platform.OS === 'ios' ? CONTAINER_SPACING : CONTAINER_SPACING * 2}
      justify="space-between"
      items="center"
      {...safeAreaMargins}
      {...props}
    >
      {children}
    </XStack>
  );
};
