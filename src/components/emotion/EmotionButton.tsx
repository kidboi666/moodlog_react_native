import { useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Button } from '../common/Button';
import { EmotionLevel, EmotionType } from '@/src/types/enums';

interface Props extends ViewProps {}

export const EmotionButton = () => {
  const [emotionType, setEmotionType] = useState<EmotionType>(
    EmotionType.HAPPY,
  );
  const [emotionLevel, setEmotionLevel] = useState<EmotionLevel>(
    EmotionLevel.ZERO,
  );
  const emotionColor = {};
  return (
    <Button
      size="none"
      width="$1.5"
      height="$1"
      rounded="$2"
      bg="$color.blueLight"
    >
      <View />
    </Button>
  );
};
