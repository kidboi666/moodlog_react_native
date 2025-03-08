import { ScrollView } from 'tamagui';
import React, { useEffect } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useLocalSearchParams } from 'expo-router';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { useTranslation } from 'react-i18next';
import { useScroll } from '@/store/hooks/useScroll';
import { toSingle } from '@/utils/common';
import JournalHeader from '@/components/layouts/headers/JournalHeader';
import * as S from '../../../styles/journal/Journal.styled';

export default function JournalScreen() {
  const { journalId } = useLocalSearchParams();
  const { selectedJournal, onSelectedJournalChange } = useJournal();
  const { fontSize } = useApp();
  const { onScroll } = useScroll();
  const { t } = useTranslation();

  useEffect(() => {
    onSelectedJournalChange(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <ScrollView onScroll={onScroll} overScrollMode="always">
      <S.ViewContainer edges={['bottom']} Header={<JournalHeader />}>
        <S.XStackContainer>
          <S.MoodBar
            emotionColor={
              emotionTheme[selectedJournal.emotion.type][
                selectedJournal.emotion.level
              ]
            }
          />
          <S.ContentBox>
            <S.EmotionTextBox>
              <S.EmotionLevelText>
                {t(`emotions.levels.${selectedJournal.emotion?.level}`)}
              </S.EmotionLevelText>
              <S.EmotionTypeText>
                {t(`emotions.types.${selectedJournal.emotion?.type}`)}
              </S.EmotionTypeText>
            </S.EmotionTextBox>
            {selectedJournal.imageUri && (
              <S.ImageBox>
                <S.Image source={{ uri: selectedJournal.imageUri }} />
              </S.ImageBox>
            )}

            <S.ContentText fontSize={fontSize}>
              {selectedJournal.content}
            </S.ContentText>
          </S.ContentBox>
        </S.XStackContainer>
      </S.ViewContainer>
    </ScrollView>
  );
}
