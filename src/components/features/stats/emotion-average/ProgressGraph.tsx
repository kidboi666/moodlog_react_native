import { H3, Progress, Text, XStack, YStack } from 'tamagui';
import { EmotionType } from '@/types/enums';
import { emotionTheme } from '@/constants/themes';
import { useTranslation } from 'react-i18next';

interface Props {
  emotionScore: number;
  emotionType: EmotionType;
}

export const ProgressGraph = ({ emotionScore, emotionType }: Props) => {
  const { t } = useTranslation();

  return (
    <YStack gap="$2">
      <XStack justify="space-between" items="flex-end">
        <H3>{t(`emotions.types.${emotionType}`)}</H3>
        <Text color="$gray9">{`${Math.floor(emotionScore)}%`}</Text>
      </XStack>
      <Progress value={emotionScore} size="$1" height={20}>
        <Progress.Indicator
          animation="bouncy"
          bg={emotionTheme[emotionType].full}
        />
      </Progress>
    </YStack>
  );
};
