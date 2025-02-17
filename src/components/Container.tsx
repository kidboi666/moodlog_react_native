import { View, YStackProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const Container = ({ children, ...props }: YStackProps) => {
  return (
    <View
      flex={1}
      animation="medium"
      bg="$background"
      px={CONTAINER_SPACING}
      {...props}
    >
      {children}
    </View>
  );
};

Container.displayName = 'Container';
