import { useJournalContext } from '@/store/hooks/useJournalContext';
import { useRouter } from 'expo-router';
import { HeaderContainer } from '../HeaderContainer';
import { Button, Square, Text, XStack, YStack } from 'tamagui';
import { ALargeSmall, X } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { IJournal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { useAppContext } from '@/store/hooks/useAppContext';
import { PressStyle } from '@/constants/styles';

export default function JournalHeader({ route }) {
  const router = useRouter();
  const [journal, setJournal] = useState<IJournal>();
  const { journals } = useJournalContext();
  const { onChangeFontSize } = useAppContext();

  useEffect(() => {
    const journal = journals.find(item => item.id === route.params.journalId);
    setJournal(journal);
  }, []);

  if (!journal) return null;

  return (
    <HeaderContainer>
      <XStack justify="space-between">
        <Button
          unstyled
          animation="quick"
          p="$2"
          color="$gray11"
          l={0}
          icon={<X size="$1" />}
          onPress={() => router.back()}
          pressStyle={{
            opacity: 0.5,
            scale: 0.9,
          }}
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
        <Button
          unstyled
          color="$gray11"
          p="$2"
          icon={<ALargeSmall size="$1" />}
          animation="quick"
          onPress={onChangeFontSize}
          pressStyle={PressStyle}
        />
      </XStack>
    </HeaderContainer>
  );
}
