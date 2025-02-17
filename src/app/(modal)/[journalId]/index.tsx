import { H1, Paragraph, ScrollView, useTheme, View } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { Container } from '@/components/Container';
import { useLocalSearchParams } from 'expo-router';
import { IJournal } from '@/types/entries';
import { CurrentDate } from '@/components/CurrentDate';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/store/hooks/useAppContext';
import { CONTAINER_SPACING } from '@/constants/size';

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
      style={{
        flex: 1,
        backgroundColor: theme.background.val,
        paddingHorizontal: CONTAINER_SPACING,
      }}
      edges={['bottom']}
    >
      <Container>
        <ScrollView flex={1}>
          <CurrentDate mt="$4" localDate={journal.localDate} />
          <H1 my="$4">{journal.title}</H1>
          <Paragraph fontWeight="300" fontSize={fontSize}>
            {journal.content}
          </Paragraph>
          <View height="$10" />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}
