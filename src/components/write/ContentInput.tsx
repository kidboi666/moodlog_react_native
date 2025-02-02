import { YStack } from '@/components/common/Stack';
import { ThemedInputProps } from '@/components/common/ThemedInput.tsx';
import { useTheme } from '@/store/context/useTheme';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface ContentInputProps extends ThemedInputProps {}

export const ContentInput = ({ ...props }: ContentInputProps) => {
  const ref = useRef<TextInput>(null);
  const { colors } = useTheme();

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  return (
    <YStack style={styles.contentBox}>
      <TextInput
        multiline
        ref={ref}
        style={{ color: colors.text.secondary }}
        placeholder="오늘 당신의 감정을 기록하세요."
        placeholderTextColor={colors.text.placeholder}
        {...props}
      />
      <View style={styles.contentEmptyBox}>
        <Pressable
          onPress={handleFocusInput}
          style={styles.contentEmptyInner}
        />
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
  },
  contentEmptyBox: {
    flex: 1,
    height: '100%',
  },
  contentEmptyInner: {
    flex: 1,
    height: '100%',
  },
});
