import { Paragraph, ScrollView, useTheme, View } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { Container } from '@/components/Container';
import { useLocalSearchParams } from 'expo-router';
import { IJournal } from '@/types/entries';
import { CurrentDate } from '@/components/CurrentDate';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/store/hooks/useAppContext';

export default function JournalPage() {
  const { journalId } = useLocalSearchParams();
  const [journal, setJournal] = useState<IJournal>();
  const theme = useTheme();
  const { journals } = useJournalContext();
  const { fontSize } = useAppContext();

  useEffect(() => {
    const selectedJournal = journals.find(item => item.id === journalId);
    setJournal(selectedJournal);
  }, []);

  if (!journal) return null;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      edges={['bottom']}
    >
      <Container>
        <ScrollView flex={1}>
          <CurrentDate my="$4" localDate={journal.localDate} />
          <Paragraph fontWeight="300" fontSize={fontSize}>
            {journal.content}
          </Paragraph>
          <View height="$10" />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}
