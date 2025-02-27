import { XStack, YStack } from 'tamagui';
import { useStatistics } from '@/store/hooks/useStatistics';
import { EmotionAverage } from '@/components/features/stats/EmotionAverage';
import { TotalCount } from '@/components/features/stats/total-count/TotalCount';
import { ExpressiveMonth } from '@/components/features/stats/expressive-month/ExpressiveMonth';
import { useUser } from '@/store/hooks/useUser';

export const StatsContainer = () => {
  const { journalStats, emotionStats } = useStatistics();
  const { userInfo } = useUser();

  const { signatureEmotion } = emotionStats ?? null;
  const { daysSinceSignup } = userInfo ?? null;

  return (
    <YStack gap="$4">
      <XStack gap="$4">
        <TotalCount
          daysSinceSignup={daysSinceSignup}
          journalStats={journalStats}
        />
        <ExpressiveMonth journalStats={journalStats} />
      </XStack>
      <EmotionAverage signatureEmotion={signatureEmotion} />
    </YStack>
  );
};
