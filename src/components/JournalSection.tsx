import { useJournal } from '@/store/hooks/useJournal';
import { YStack } from 'tamagui';

export const JournalSection = () => {
  const { dailyJournals } = useJournal();

  return <YStack></YStack>;
};
