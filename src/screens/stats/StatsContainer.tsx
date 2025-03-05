import { XStack, YStack } from 'tamagui';
import { useStatistics } from '@/store/hooks/useStatistics';
import { EmotionAverage } from '@/screens/stats/emotion-average/EmotionAverage';
import { TotalCount } from '@/screens/stats/total-count/TotalCount';
import { useUser } from '@/store/hooks/useUser';

export const StatsContainer = () => {
  const { journalStats, emotionStats, expressiveMonthStats } = useStatistics();
  const { userInfo } = useUser();
  const { signatureEmotion } = emotionStats ?? null;
  const { daysSinceSignup } = userInfo ?? null;

  return (
    <YStack gap="$4">
      <XStack gap="$4">
        <TotalCount
          expressiveMonthStats={expressiveMonthStats}
          daysSinceSignup={daysSinceSignup}
          journalStats={journalStats}
        />
        <EmotionAverage signatureEmotion={signatureEmotion} />
      </XStack>
    </YStack>
  );
};
