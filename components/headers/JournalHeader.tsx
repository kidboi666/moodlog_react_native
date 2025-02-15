import { useJournalContext } from '@/store/hooks/useJournalContext';
import { useRouter } from 'expo-router';
import { HeaderContainer } from '../HeaderContainer';
import { Button, Square, Text, XStack, YStack } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { IJournal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';

export default function JournalHeader({ route }) {
  const { journals } = useJournalContext();
  const [journal, setJournal] = useState<IJournal>();
  const router = useRouter();

  useEffect(() => {
    const journal = journals.find(item => item.id === route.params.journalId);
    setJournal(journal);
  }, []);

  if (!journal) return null;

  return (
    <HeaderContainer>
      <XStack justify="center">
        <Button
          size="$3"
          position="absolute"
          l={0}
          icon={X}
          onPress={() => router.back()}
        />
        <XStack gap="$2" items="center">
          <Square
            size="$2"
            rounded="$2"
            bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
          />
          <YStack>
            <Text fontSize="$2">{journal.emotion.type.toUpperCase()}</Text>
            <Text fontSize="$2" color="$gray10">
              {journal.emotion.level.toUpperCase()}
            </Text>
          </YStack>
        </XStack>
      </XStack>
    </HeaderContainer>
  );
}
