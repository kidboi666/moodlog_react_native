import { useJournal } from '@/store/hooks/useJournal';
import { YStack } from 'tamagui';

export const JournalSection = () => {
  const { selectedJournals } = useJournal();

  return <YStack></YStack>;
};
