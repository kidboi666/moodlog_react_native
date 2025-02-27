import { Button, RadioGroup, Text, XStack } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { Pressable } from 'react-native';

interface Props {
  value: string;
  label: string;
  onValueChange: (value: string) => void;
}

export const RadioGroupItem = ({ value, label, onValueChange }: Props) => {
  return (
    <Button
      unstyled
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      onPress={() => onValueChange(value)}
    >
      <Pressable
        onPress={() => onValueChange(value)}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.3)',
        }}
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
      </Pressable>
    </Button>
  );
};
