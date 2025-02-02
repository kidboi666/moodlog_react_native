import { EmotionLevel, EmotionType } from '@/types/enums';
import { useState } from 'react';
import { Pressable, StyleSheet, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const EmotionButton = ({ style }: Props) => {
  const [emotionType, setEmotionType] = useState<EmotionType>(
    EmotionType.HAPPY,
  );
  const [emotionLevel, setEmotionLevel] = useState<EmotionLevel>(
    EmotionLevel.ZERO,
  );
  const emotionColor = {};
  return (
    <Pressable style={[styles.container, style]}>
      <View />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 4,
  },
});
