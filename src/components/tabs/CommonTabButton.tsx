import { Button, ButtonProps } from 'tamagui';

export const CommonTabButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      unstyled
      animation="quick"
      flex={1}
      p="$3"
      pressStyle={{ scale: 0.85 }}
      enterStyle={{ scale: 0.9, opacity: 0, y: 10 }}
      {...props}
    />
  );
};
