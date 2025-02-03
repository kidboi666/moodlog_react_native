import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import { Input, InputProps, View, YStack } from 'tamagui';

export const ContentInput = ({ ...props }: InputProps) => {
  const ref = useRef<Input>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  return (
    <YStack flex={1}>
      <Input
        multiline
        ref={ref}
        borderWidth={0}
        px={0}
        color="$textSecondary"
        placeholder="오늘 당신의 감정을 기록하세요."
        placeholderTextColor="$textPlaceholder"
        {...props}
      />
      <View flex={1} height="100%">
        <Pressable
          onPress={handleFocusInput}
          style={{
            flex: 1,
            height: '100%',
          }}
        />
      </View>
    </YStack>
  );
};
