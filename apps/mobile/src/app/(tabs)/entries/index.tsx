import { Fragment, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { ScrollView } from 'tamagui';

import { GardenSection } from '@/core/components/features/entries/GardenSection';
import { EmptyJournal } from '@/core/components/features/journal/EmptyJournal';
import { JournalCard } from '@/core/components/features/journal/JournalCard';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useBottomSheet } from '@/core/store/bottom-sheet.store';
import { useJournal } from '@/core/store/journal.store';

import { BottomSheetType } from '@/types/bottom-sheet.types';

import * as S from '@/styles/screens/entries/Entries.styled';

export default function Screen() {
  const selectedJournals = useJournal(state => state.selectedJournals);
  const isLoading = useJournal(state => state.isLoading);
  const selectJournals = useJournal(state => state.selectJournals);
  const removeJournal = useJournal(state => state.removeJournal);
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet);
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet);

  const { selectedMonth } = useCalendar();
  const { t } = useTranslation();

  const openDeleteSheet = useCallback(
    (id: string) => {
      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        {
          journalId: id,
          isLoading,
          onDelete: removeJournal,
          hideBottomSheet,
          onSuccess: () => {
            selectJournals(selectedMonth);
          },
        },
      );
    },
    [
      showBottomSheet,
      hideBottomSheet,
      isLoading,
      selectedMonth,
      removeJournal,
      selectJournals,
    ],
  );

  return (
    <ScrollView>
      <S.ViewContainer edges={['top']} padded>
        <S.Title>{t('entries.title')}</S.Title>
        <FadeIn delay={ANIMATION_DELAY_MS[0]}>
          <GardenSection />
        </FadeIn>

        <S.JournalBox>
          {Array.isArray(selectedJournals) ? (
            selectedJournals.map(journal => {
              const { content, imageUri, id, createdAt, mood } = journal;
              return (
                <Fragment key={id}>
                  <JournalCard
                    {...{
                      id,
                      content,
                      imageUri,
                      createdAt,
                      moodType: mood.type,
                      moodLevel: mood.level,
                      openDeleteSheet,
                    }}
                  />
                </Fragment>
              );
            })
          ) : (
            <EmptyJournal isToday={false} />
          )}
        </S.JournalBox>
      </S.ViewContainer>
    </ScrollView>
  );
}
