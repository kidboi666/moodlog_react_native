import { Input, styled, View, YStack } from 'tamagui';
import React, { useRef } from 'react';
import { Pressable } from 'react-native';

const StyledContentInput = styled(Input, {
  borderWidth: 0,
  px: 0,
  color: '$textSecondary',
  bg: 'transparent',
});

export const ContentInput = ({ ...props }) => {
  // @TODO any type
  const ref = useRef<any>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  return (
    <YStack flex={1}>
      <StyledContentInput
        multiline
        ref={ref}
        placeholderTextColor="$textPlaceholder"
        placeholder="오늘 당신의 감정을 기록하세요."
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
