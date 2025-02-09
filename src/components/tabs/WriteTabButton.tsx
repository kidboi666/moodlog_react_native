import { Button, ButtonProps } from 'tamagui';

export const WriteTabButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      unstyled
      rounded="$8"
      animation="quick"
      flex={1}
      items="center"
      justify="center"
      p="$5"
      bg="$gray12"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.2}
      shadowRadius={3}
      pressStyle={{ scale: 0.85, opacity: 0.9 }}
      enterStyle={{ scale: 0.9, opacity: 0, y: 10 }}
      {...props}
    />
  );
};
