import { Button, RadioGroup, Text, XStack } from 'tamagui';
import { PRESS_STYLE } from '@/constants/styles';

interface Props {
  value: string;
  label: string;
  onValueChange: (value: string) => void;
}

export const RadioGroupItem = ({ value, label, onValueChange }: Props) => {
  return (
    <Button
      unstyled
      animation="medium"
      rounded="$4"
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
