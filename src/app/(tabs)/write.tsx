import { Container } from '@/components/common/Container';
import { ContentInput } from '@/components/write/ContentInput';
import { ContentLine } from '@/components/write/ContentLine';
import * as Crypto from 'expo-crypto';
import { TitleInput } from '@/components/write/TitleInput';
import { IEmotion, IJournal } from '@/types/entries';
import { formatDate } from '@/utils/common/formatDate';
import { H1, Text, View, XStack, YStack } from 'tamagui';
import React, { useState } from 'react';
import { SaveButton } from '@/components/navigation/SaveButton';

export default function WriteScreen() {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<IEmotion>({
    type: null,
    level: null,
  });
  const [newJournal, setNewJournal] = useState<IJournal>({
    id: Crypto.randomUUID(),
    title: '',
    content: '',
    emotion: selectedEmotion,
    date: new Date(),
    keywords: [],
  });
  const { month, day } = formatDate(new Date());

  const titleInputHandler = (e: string) => {
    setNewJournal(prev => ({ ...prev, title: e }));
  };

  const contentInputHandler = (e: string) => {
    setNewJournal(prev => ({ ...prev, content: e }));
  };

  return (
    <Container>
      <XStack justify="space-between" items="center" width="100%" py={12}>
        <XStack flex={1} items="center" gap={8}>
          <H1
            fontStyle="italic"
            fontSize="$9"
            fontWeight="900"
            color="$textPrimary"
          >
            Write
          </H1>
          <Text color="$textTertiary">{`${month}월 ${day}일`}</Text>
        </XStack>
        <SaveButton />
      </XStack>
      <XStack justify="center" items="center" gap={12}></XStack>
      <YStack flex={1} gap={12}>
        <View width="100%">
          <TitleInput
            value={newJournal.title}
            onChangeText={titleInputHandler}
          />
          <ContentLine />
        </View>
        <ContentInput
          value={newJournal.content}
          onChangeText={contentInputHandler}
        />
      </YStack>
    </Container>
  );
}
