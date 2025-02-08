import { Container } from '@/components/common/Container';
import { ContentInput } from '@/components/write/ContentInput';
import * as Crypto from 'expo-crypto';
import { TitleInput } from '@/components/write/TitleInput';
import { IEmotion, IJournal } from '@/types/entries';
import { formatDate } from '@/utils/common/formatDate';
import { Form, Separator } from 'tamagui';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useDiary } from '@/store/useDiary';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';

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

  const handleChangeEmotion = (emotion: IEmotion) => {
    setSelectedEmotion({
      type: emotion.type,
      level: emotion.level,
    });
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
    <Container
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
        <EmotionPicker
          selectedEmotion={selectedEmotion}
          onChangeEmotion={handleChangeEmotion}
        />
        <TitleInput value={newJournal.title} onChangeText={titleInputHandler} />

        <Separator borderColor="$gray4" />
        <ContentInput
          value={newJournal.content}
          onChangeText={contentInputHandler}
        />
      </Form>
    </Container>
  );
}
