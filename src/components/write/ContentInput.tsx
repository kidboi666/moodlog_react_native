import { ThemedInputProps } from '@/components/common/ThemedInput.tsx';
import { useTheme } from '@/store/context/useTheme';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface ContentInputProps extends ThemedInputProps {}

export const ContentInput = ({ ...props }: ContentInputProps) => {
  const ref = useRef<TextInput>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  const { colors } = useTheme();
  return (
    <View style={styles.contentBox}>
      <TextInput
        multiline
        ref={ref}
        numberOfLines={4}
        style={{ color: colors.text.secondary }}
        placeholder="오늘 당신의 감정을 기록하세요."
        {...props}
      />
      <View style={styles.contentEmptyBox}>
        <Pressable
          onPress={handleFocusInput}
          style={styles.contentEmptyBoxInner}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentEmptyBox: {
    flex: 1,
  },
  contentEmptyBoxInner: {
    flex: 1,
  },
  contentBox: {
    flex: 1,
  },
});
