import React, { useRef } from 'react';
import { Button, Input, InputProps, View, YStack } from 'tamagui';
import { useThemeContext } from '@/store/hooks/useThemeContext';

export const ContentInput = ({ ...props }: InputProps) => {
  const { theme } = useThemeContext();
  const ref = useRef<Input>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  return (
    <YStack flex={1}>
      <Input
        unstyled
        multiline
        ref={ref}
        color="$color"
        placeholder="How are you feeling today?"
        placeholderTextColor="$gray7"
        {...props}
      />
      <View flex={1} height="100%">
        <Button unstyled flex={1} height="100%" onPress={handleFocusInput} />
      </View>
    </YStack>
  );
};
