import React, { useRef, useState } from 'react';
import { Button, Input, InputProps, View, YStack } from 'tamagui';

export const ContentInput = ({ fontSize, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<Input>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
    setIsFocused(true);
  };

  return (
    <YStack flex={1}>
      <Input
        unstyled
        multiline
        fontSize={fontSize}
        flex={isFocused ? 1 : 0}
        ref={ref}
        pb="$4"
        color="$color"
        verticalAlign="top"
        placeholder="How are you feeling today?"
        placeholderTextColor="$gray7"
        {...props}
      />
      {!isFocused && (
        <View flex={1}>
          <Button unstyled flex={1} onPress={handleFocusInput} />
        </View>
      )}
    </YStack>
  );
};
