import { H3, Text, View, YStack } from 'tamagui';
import { useStatistics } from '@/store/hooks/useStatistics';
import { ProgressGraph } from '@/components/features/stats/emotion-average/ProgressGraph';
import { EmotionType } from '@/types/enums';
import { Minimize2 } from '@tamagui/lucide-icons';

export const ExpandedContent = () => {
  const { emotionStats } = useStatistics();

  const { scoreBoard } = emotionStats;
  let emotionTotalScore = 0;

  Object.values(scoreBoard).forEach(scoreCount => {
    emotionTotalScore += scoreCount.score;
  });

  return (
    <View
      animation="quick"
      animateOnly={['opacity']}
      justify="space-between"
      flex={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <YStack flex={1} gap="$4" justify="space-between">
        <YStack gap="$2">
          <H3>감정 분포</H3>
          <Text>지금까지 작성한 감정 분포 그래프</Text>
        </YStack>
        <YStack flex={1} justify="space-between">
          {Object.entries(scoreBoard).map(([type, countScore], i) => (
            <ProgressGraph
              key={i}
              emotionType={type as EmotionType}
              emotionScore={Math.round(
                (countScore.score / emotionTotalScore) * 100,
              )}
            />
          ))}
        </YStack>
        <Minimize2 size="$1" self="flex-end" opacity={0.6} />
      </YStack>
    </View>
  );
};
