import { Paragraph, ScrollView, useTheme, View } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { ContainerWithSafeAreaView } from '@/components/Container';
import { useLocalSearchParams } from 'expo-router';
import { IJournal } from '@/types/entries';
import { CurrentDate } from '@/components/Date';

export default function JournalPage() {
  const { journals } = useJournalContext();
  const [journal, setJournal] = useState<IJournal>();
  const theme = useTheme();
  const { journalId } = useLocalSearchParams();

  useEffect(() => {
    const selectedJournal = journals.find(item => item.id === journalId);
    setJournal(selectedJournal);
  }, []);
  //
  // useEffect(() => {
  //   if (journal) {
  //     const emotionColor = emotionColorContext[journal.emotion.type];
  //     const emotionLevel = emotionLevelContext[journal.emotion.level];
  //     const color = (emotionColor + emotionLevel) as any;
  //     NavigationBar.setBackgroundColorAsync(theme?.[color]?.val);
  //   }
  //
  //   return () => {
  //     NavigationBar.setBackgroundColorAsync(theme.background.val);
  //   };
  // }, [journal]);

  if (!journal) return null;

  return (
    <ContainerWithSafeAreaView
      // colors={[
      //   '$background',
      //   emotionTheme[journal.emotion.type][journal.emotion.level],
      // ]}
      // start={[0, 0.6]}
      // end={[0, 2]}
      p="$4"
      edges={['bottom']}
    >
      <ScrollView flex={1}>
        <CurrentDate mb="$4" />
        <Paragraph fontWeight="300">{journal.content}</Paragraph>
        <View height="$10" />
      </ScrollView>
    </ContainerWithSafeAreaView>
  );
}
