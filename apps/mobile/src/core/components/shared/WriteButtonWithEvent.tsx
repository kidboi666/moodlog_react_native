import { memo, useCallback, useEffect, useState } from 'react';

import { Keyboard } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Plus } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';

import * as S from '@/core/components/shared/CustomTabBar.styled';
import {
  JOURNAL_WRITE_SNAP_POINTS,
  SELECT_MOOD_SNAP_POINTS,
} from '@/core/constants/size';
import { useBottomSheet } from '@/core/store/bottom-sheet.store';
import { useJournal } from '@/core/store/journal.store';

import { BottomSheetType } from '@/types/bottom-sheet.types';
import { Draft } from '@/types/journal.types';
import { Mood } from '@/types/mood.types';

export const WriteButtonWithEvent = memo(() => {
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet);
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet);
  const addJournal = useJournal(state => state.addJournal);
  const isLoading = useJournal(state => state.isLoading);
  const toast = useToastController();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (draft: Draft) => {
      await addJournal(draft);
      toast.show(t('notifications.success.journal.title'), {
        message: t('notifications.success.journal.message'),
        preset: 'success',
      });
      setIsSubmitted(true);
      Keyboard.dismiss();
    },
    [toast, addJournal, t],
  );

  const handleWriteButtonPress = useCallback(() => {
    showBottomSheet(BottomSheetType.SELECT_MOOD, SELECT_MOOD_SNAP_POINTS, {
      onPress: (mood: Mood) => {
        if (!mood) return;

        showBottomSheet(
          BottomSheetType.JOURNAL_WRITE,
          JOURNAL_WRITE_SNAP_POINTS,
          {
            moodType: mood.type,
            moodLevel: mood.level,
            onSubmit: handleSubmit,
            isLoading,
            isSubmitted,
          },
        );
      },
    });
  }, [showBottomSheet, isLoading, isSubmitted, handleSubmit]);

  useEffect(() => {
    if (isSubmitted) {
      hideBottomSheet();
      const timer = setTimeout(() => setIsSubmitted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, hideBottomSheet]);

  useEffect(() => {}, []);

  return (
    <S.WriteTabContainer>
      <S.WriteButton onPress={handleWriteButtonPress}>
        <S.IconBox>
          <Plus size="$1" color="$color1" />
        </S.IconBox>
      </S.WriteButton>
    </S.WriteTabContainer>
  );
});
