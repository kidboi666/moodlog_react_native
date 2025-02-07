import { Container } from '@/components/common/Container';
import { ContentInput } from '@/components/write/ContentInput';
import * as Crypto from 'expo-crypto';
import { TitleInput } from '@/components/write/TitleInput';
import { IEmotion, IJournal } from '@/types/entries';
import { formatDate } from '@/utils/common/formatDate';
import { Separator, YStack } from 'tamagui';
import React, { useState } from 'react';

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
      <YStack flex={1} gap={12}>
        <TitleInput value={newJournal.title} onChangeText={titleInputHandler} />
        <Separator borderColor="$separator" />
        <ContentInput
          value={newJournal.content}
          onChangeText={contentInputHandler}
        />
      </YStack>
    </Container>
  );
}
