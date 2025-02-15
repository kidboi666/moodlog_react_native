import { Paragraph, ScrollView, View } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { ContainerWithSafeAreaView } from '@/components/Container';
import { useLocalSearchParams } from 'expo-router';
import { IJournal } from '@/types/entries';
import { CurrentDate } from '@/components/CurrentDate';

export default function JournalPage() {
  const { journals } = useJournalContext();
  const [journal, setJournal] = useState<IJournal>();
  const { journalId } = useLocalSearchParams();

  useEffect(() => {
    const selectedJournal = journals.find(item => item.id === journalId);
    setJournal(selectedJournal);
  }, []);

  if (!journal) return null;

  return (
    <ContainerWithSafeAreaView p="$4" edges={['bottom']}>
      <ScrollView flex={1}>
        <CurrentDate mb="$4" localDate={journal.localDate} />
        <Paragraph fontWeight="300">{journal.content}</Paragraph>
        <View height="$10" />
      </ScrollView>
    </ContainerWithSafeAreaView>
  );
}
