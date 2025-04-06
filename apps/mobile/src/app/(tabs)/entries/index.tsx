import { GardenSection } from '@/core/components/features/entries/GardenSection';
import { EmptyJournal } from '@/core/components/features/journal/EmptyJournal';
import { JournalCard } from '@/core/components/features/journal/JournalCard';
import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';
import { ANIMATION_DELAY_MS } from '@/core/constants/time';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { useJournal } from '@/core/store/contexts/journal.context';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import * as S from '@/styles/screens/entries/Entries.styled';
import { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'tamagui';

export default function Screen() {
  const { selectedJournals, selectJournals, isLoading, removeJournal } =
    useJournal();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { selectedMonth } = useCalendar();
  const { t } = useTranslation();

  const handleDeletePress = useCallback((id: string) => {
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
  }, []);

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
                      onDeletePress: handleDeletePress,
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
