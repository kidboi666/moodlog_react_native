import { Container } from '@/components/common/Container';
import { ContentInput } from '@/components/write/ContentInput';
import * as Crypto from 'expo-crypto';
import { TitleInput } from '@/components/write/TitleInput';
import { IEmotion, IJournal } from '@/types/entries';
import { formatDate } from '@/utils/common/formatDate';
import { Button, Form, Separator, YStack } from 'tamagui';
import React, { useCallback, useState } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { Check } from '@tamagui/lucide-icons';
import { useDiary } from '@/store/context/useDiary';

export default function WriteScreen() {
  const [key, setKey] = useState(0);
  const { journals, addJournal } = useDiary();
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

  const handleSubmit = () => {
    if (!newJournal.title && !newJournal.content) return null;
    addJournal(newJournal);
  };

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  return (
    <Container>
      <YStack
        key={key}
        animation="quick"
        enterStyle={{
          y: 100,
          opacity: 0,
        }}
        exitStyle={{
          y: -100,
          opacity: 0,
        }}
        flex={1}
        gap={12}
      >
        <Form onSubmit={handleSubmit} flex={1}>
          <TitleInput
            value={newJournal.title}
            onChangeText={titleInputHandler}
          />
          <Separator borderColor="$separator" />
          <ContentInput
            value={newJournal.content}
            onChangeText={contentInputHandler}
          />
          <Link href="/modal_select_emotion" asChild>
            <Button icon={<Check />} />
          </Link>
        </Form>
      </YStack>
    </Container>
  );
}
