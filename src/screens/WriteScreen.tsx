import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '@/components/common/ThemedText';
import { ContentInput } from '@/components/write/ContentInput.tsx';
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
  const { year, month, day } = formatDate(new Date());
  const titleInputHandler = (e: string) => {
    setNewJournal(prev => ({ ...prev, title: e }));
  };

  const contentInputHandler = (e: string) => {
    setNewJournal(prev => ({ ...prev, content: e }));
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.dateBox}>
        <ThemedText variant="secondary">{`${year}년 ${month}월 ${day}일`}</ThemedText>
      </View>
      <View style={styles.inputBox}>
        <TitleInput
          value={newJournal.title}
          onChangeText={titleInputHandler}
          placeholder="제목을 입력하세요."
        />
        <ContentInput
          value={newJournal.content}
          onChangeText={contentInputHandler}
          placeholder="오늘 당신의 감정을 기록하세요."
        />
      </View>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 12,
  },
  dateBox: {
    width: '100%',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    gap: 12,
  },
});
