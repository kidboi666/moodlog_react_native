import React, { useRef } from 'react';
import { Button, Input, View, YStack } from 'tamagui';

export const ContentInput = ({ ...props }) => {
  // @TODO any type
  const ref = useRef<any>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  return (
    <YStack flex={1}>
      <Input
        multiline
        unstyled
        ref={ref}
        placeholder="오늘 당신의 감정을 기록하세요."
        placeholderTextColor="$placeholder"
        {...props}
      />
      <View flex={1} height="100%">
        <Button unstyled flex={1} height="100%" onPress={handleFocusInput} />
      </View>
    </YStack>
  );
};
