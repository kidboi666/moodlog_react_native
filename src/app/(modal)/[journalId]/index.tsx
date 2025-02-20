import { H1, Paragraph, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { Container } from '@/components/containers/Container';
import { useLocalSearchParams } from 'expo-router';
import { IJournal } from '@/types/entries';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';

export default function JournalPage() {
  const { journalId } = useLocalSearchParams();
  const [journal, setJournal] = useState<IJournal>();
  const { journals } = useJournal();
  const { fontSize } = useApp();

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
