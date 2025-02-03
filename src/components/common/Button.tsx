import { StyledButton } from '@/components/common/Button.styled';
import { GetProps } from '@tamagui/core';

type Props = GetProps<typeof StyledButton>;

export const Button = ({
  variant = 'primary',
  size,
  disabled = false,
  ...props
}: Props) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      pressStyle={{ opacity: 0.7 }}
      {...props}
    />
  );
};

Button.displayName = 'ThemedButton';
