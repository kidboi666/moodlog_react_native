import React, { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { ScrollView, XStack } from 'tamagui';

import { JournalHeader } from '@/core/components/features/journal/JournalHeader';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';
import { moodTheme } from '@/core/constants/themes';
import { useApp } from '@/core/store/app.store';
import { useBottomSheet } from '@/core/store/bottom-sheet.store';
import { useJournal } from '@/core/store/journal.store';

import { BottomSheetType } from '@/types/bottom-sheet.types';

import { toSingle } from '@/utils/common';

import * as S from '@/styles/screens/journal/Journal.styled';

export default function Screen() {
  const { id } = useLocalSearchParams();
  const journalId = toSingle(id);
  const router = useRouter();
  const selectedJournal = useJournal(state => state.selectedJournal);
  const selectJournal = useJournal(state => state.selectJournal);
  const isLoading = useJournal(state => state.isLoading);
  const removeJournal = useJournal(state => state.removeJournal);
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet);
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet);
  const fontSize = useApp(state => state.settings.fontSize);
  const { t } = useTranslation();
  const [[page, going], setPage] = useState([0, 0]);

  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const handleDeletePress = useCallback(() => {
    showBottomSheet(
      BottomSheetType.DELETE_JOURNAL,
      DELETE_JOURNAL_SNAP_POINTS,
      {
        journalId,
        isLoading,
        onDelete: removeJournal,
        hideBottomSheet,
        onSuccess: () => {
          router.push('/entries');
        },
      },
    );
  }, [
    showBottomSheet,
    journalId,
    isLoading,
    removeJournal,
    router,
    hideBottomSheet,
  ]);

  useEffect(() => {
    selectJournal(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <ScrollView overScrollMode="always">
      <S.ViewContainer
        edges={['bottom']}
        Header={
          <JournalHeader
            journal={selectedJournal}
            onDeletePress={handleDeletePress}
            onBackPress={() => router.back()}
          />
        }
      >
        <XStack>
          <S.MoodBar
            moodColor={
              moodTheme[selectedJournal.mood.type][selectedJournal.mood.level]
            }
          />
          <S.ContentBox>
            <S.MoodTextBox>
              <S.MoodLevelText>
                {t(`moods.levels.${selectedJournal.mood?.level}`)}
              </S.MoodLevelText>
              <S.MoodTypeText>
                {t(`moods.types.${selectedJournal.mood?.type}`)}
              </S.MoodTypeText>
            </S.MoodTextBox>
            {selectedJournal.imageUri.length !== 0 && (
              <ScrollView horizontal>
                <S.ImageBox>
                  {selectedJournal.imageUri.map(uri => (
                    <S.Image key={uri} source={{ uri }} />
                  ))}
                </S.ImageBox>
              </ScrollView>
            )}

            <S.ContentText fontSize={fontSize}>
              {selectedJournal.content}
            </S.ContentText>
          </S.ContentBox>
        </XStack>
      </S.ViewContainer>
    </ScrollView>
  );
}
