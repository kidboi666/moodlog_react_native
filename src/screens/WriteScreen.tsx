import { Container } from '@/components/common/Container';
import { Text } from '@/components/common/ThemedText';
import { EmotionButton } from '@/components/emotion/EmotionButton';
import { BackButton } from '@/components/navigation/BackButton';
import { SaveButton } from '@/components/navigation/SaveButton';
import { ContentInput } from '@/components/write/ContentInput.tsx';
import { ContentLine } from '@/components/write/ContentLine';
import { TitleInput } from '@/components/write/TitleInput.tsx';
import { IEmotion, IJournal } from '@/types/entries';
import { RootStackParamList } from '@/types/screens';
import { formatDate } from '@/utils/common/formatDate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { View, XStack, YStack } from 'tamagui';

type Props = NativeStackScreenProps<RootStackParamList, 'Write'>;

export const WriteScreen = ({ navigation }: Props) => {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<IEmotion>({
    type: null,
    level: null,
  });
  const [newJournal, setNewJournal] = useState<IJournal>({
    id: uuid.v4(),
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
    <Container px={24} flex={1} gap={12}>
      <XStack justify="space-between" items="center" width="100%" py={12}>
        <BackButton />
        <XStack justify="center" items="center" gap={12}>
          <Text variant="tertiary">{`${month}월 ${day}일`}</Text>
          <EmotionButton />
        </XStack>
        <SaveButton />
      </XStack>
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
};
