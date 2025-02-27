import { Button } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { IconRenderer } from '@/components/features/drawer/DrawerContent';

interface DrawerItemProps {
  icon: IconRenderer;
  isSelected: boolean;
  onPress: () => void;
  label: string;
}

export const DrawerItem = ({
  icon,
  isSelected,
  onPress,
  label,
}: DrawerItemProps) => {
  return (
    <Button
      unstyled
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      flexDirection="row"
      items="center"
      fontSize="$5"
      p="$4"
      gap="$1"
      justify="flex-start"
      rounded="$4"
      color={isSelected ? '$gray1' : '$gray12'}
      bg={isSelected ? '$gray12' : 'transparent'}
      icon={icon(isSelected)}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};
