import { useState } from 'react';
import { ViewProps } from 'react-native';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { Button } from '@/components/common/Button';

interface Props extends ViewProps {}

export const EmotionButton = () => {
  const [emotionType, setEmotionType] = useState<EmotionType>(
    EmotionType.HAPPY,
  );
  const [emotionLevel, setEmotionLevel] = useState<EmotionLevel>(
    EmotionLevel.ZERO,
  );
  const emotionColor = {};
  return <Button></Button>;
};
