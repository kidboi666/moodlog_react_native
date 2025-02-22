import { XStack, YStack } from 'tamagui';
import { useStatistics } from '@/store/hooks/useStatistics';
import { EmotionAverage } from '@/components/features/stats/EmotionAverage';
import { TotalCount } from '@/components/features/stats/TotalCount';
import { ExpressiveMonth } from '@/components/features/stats/ExpressiveMonth';

export const StatsContainer = () => {
  const { journalStats, emotionStats } = useStatistics();
  const { signatureEmotion } = emotionStats;

  return (
    <YStack gap="$4">
      <XStack gap="$4">
        <TotalCount journalStats={journalStats} />
        <ExpressiveMonth journalStats={journalStats} />
      </XStack>
      <EmotionAverage signatureEmotion={signatureEmotion} />
    </YStack>
  );
};
