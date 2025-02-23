import { Button, RadioGroup, Text, useTheme, XStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

export const RadioGroupItem = ({ value, label, onValueChange }) => {
  const theme = useTheme();
  return (
    <Button
      unstyled
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      onPress={() => onValueChange(value)}
    >
      <XStack
        items="center"
        width="100%"
        gap="$4"
        p="$5"
        justify="space-between"
      >
        <Text fontSize="$6">{label}</Text>
        <RadioGroup.Item value={value} id={value}>
          <RadioGroup.Indicator />
        </RadioGroup.Item>
      </XStack>
    </Button>
  );
};
