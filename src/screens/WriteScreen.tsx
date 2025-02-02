import { Container } from '@/components/common/Container';
import { XStack, YStack } from '@/components/common/Stack';
import { ThemedText } from '@/components/common/ThemedText';
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
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';

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
    <Container style={styles.container}>
      <XStack justifyCenter alignCenter style={styles.floatBox}>
        <BackButton />
        <XStack justifyCenter alignCenter spacing={8}>
          <ThemedText variant="tertiary">{`${month}월 ${day}일`}</ThemedText>
          <EmotionButton />
        </XStack>
        <SaveButton />
      </XStack>
      <YStack flex spacing={12}>
        <View>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 12,
    flex: 1,
  },
  floatBox: {
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
});
