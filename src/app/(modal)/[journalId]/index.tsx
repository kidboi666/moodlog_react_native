import {
  H1,
  Paragraph,
  ScrollView,
  Text,
  useTheme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import React, { useEffect, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { Container } from '@/components/Container';
import { useLocalSearchParams } from 'expo-router';
import { IJournal } from '@/types/entries';
import { useAppContext } from '@/store/hooks/useAppContext';
import { emotionTheme } from '@/constants/themes';

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
    <Container flexDirection="row" gap="$3" pl={0}>
      <View
        width="3%"
        height="100%"
        borderTopRightRadius="$4"
        bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
      />
      <ScrollView flex={1}>
        <YStack>
          <XStack gap="$2">
            <YStack>
              <Text fontSize="$2">{journal.emotion.type.toUpperCase()}</Text>
              <Text fontSize="$2" color="$gray10">
                {journal.emotion.level.toUpperCase()}
              </Text>
            </YStack>
          </XStack>
          <H1 mb="$6">{journal.title}</H1>
          <Paragraph fontWeight="300" fontSize={fontSize}>
            {journal.content}
          </Paragraph>
          <View height="$8" />
        </YStack>
      </ScrollView>
    </Container>
  );
}
