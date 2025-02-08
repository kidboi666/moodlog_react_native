import { Button, ButtonProps } from 'tamagui';
import { PropsWithChildren } from 'react';

export const CommonTabButton = ({
  children,
  onPress,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      unstyled
      onPress={onPress}
      animation="quick"
      flex={1}
      p="$3"
      pressStyle={{ scale: 0.85 }}
      enterStyle={{ scale: 0.9, opacity: 0, y: 10 }}
    >
      {children}
    </Button>
  );
};
