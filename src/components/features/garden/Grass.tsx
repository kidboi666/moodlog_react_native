import { View } from 'tamagui';
import { Emotion } from '@/types/entries';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { emotionTheme } from '@/constants/themes';

interface Props {
  emotions?: Emotion[];
  isEmpty?: boolean;
}

export const Grass = ({ emotions, isEmpty = false }: Props) => {
  if (!emotions || isEmpty) {
    return <View width={16} height={16} />;
  }
  const scoreBoard = {
    angry: 0,
    peace: 0,
    sad: 0,
    happy: 0,
  };
  emotions.forEach(emotion => {
    switch (emotion.level) {
      case EmotionLevel.FULL: {
        return (scoreBoard[emotion.type] = scoreBoard[emotion.type] + 3);
      }
      case EmotionLevel.HALF: {
        return (scoreBoard[emotion.type] = scoreBoard[emotion.type] + 2);
      }
      case EmotionLevel.ZERO: {
        return (scoreBoard[emotion.type] = scoreBoard[emotion.type] + 1);
      }
    }
  });
  const emotionColor = Object.entries(scoreBoard).sort(
    (a, b) => a[1] - b[1],
  )[0][0] as EmotionType;

  return (
    <View
      bg={emotions[0] ? emotionTheme[emotionColor].full : '$gray10'}
      width={16}
      height={16}
      rounded="$1"
    />
  );
};
