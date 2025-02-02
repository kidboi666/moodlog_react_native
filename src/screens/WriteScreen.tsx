import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedView } from '@/components/common/ThemedView.tsx';
import { ContentInput } from '@/components/write/ContentInput.tsx';
import { TitleInput } from '@/components/write/TitleInput.tsx';
import { IEmotion, IJournal } from '@/types/entries';
import { RootStackParamList } from '@/types/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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

  const titleInputHandler = (e: string) => {
    setNewJournal(prev => ({ ...prev, title: e }));
  };

  const contentInputHandler = (e: string) => {
    setNewJournal(prev => ({ ...prev, content: e }));
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <TitleInput
        value={newJournal.title}
        onChangeText={titleInputHandler}
        placeholder="오늘 당신의 감정을 기록하세요."
      />
      <ThemedView style={styles.contentInputBox}>
        <ContentInput
          value={newJournal.content}
          onChangeText={contentInputHandler}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  contentInputBox: {
    flex: 1,
  },
});
