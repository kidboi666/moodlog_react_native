import { View, YStackProps } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const Container = ({ children, ...props }: YStackProps) => {
  return (
    <View
      flex={1}
      {...props}
      animation="medium"
      bg="$background"
      px={CONTAINER_SPACING}
    >
      {children}
    </View>
  );
};

Container.displayName = 'Container';
