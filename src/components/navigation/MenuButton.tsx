import { StyledMenuButton } from '@/components/navigation/MenuButton.styled';
import { ButtonProps } from 'tamagui';

export const MenuButton = ({ ...props }: ButtonProps) => {
  return <StyledMenuButton {...props} />;
};
