import { HomeJournalCard } from '@/core/components/features/home/HomeJournalCard';
import { WeekDay } from '@/core/components/features/home/WeekDay';
import { WelcomeZone } from '@/core/components/features/home/WelcomeZone';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import { useJournal } from '@/core/store/contexts/journal.context';
import { useUser } from '@/core/store/contexts/user.context';
import { BottomSheetType } from '@/core/store/types/bottom-sheet.types';
import { getGemini } from '@/lib/gemini';
import * as S from '@/styles/screens/home/Home.styled';
import { useToastController } from '@tamagui/toast';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'tamagui';

export default function Screen() {
  const { selectedJournals, selectJournals, isLoading, removeJournal } =
    useJournal();
  const { isToday, selectedDate } = useCalendar();
  const { userInfo } = useUser();
  const toast = useToastController();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { t } = useTranslation();
  const gemini = getGemini();

  const handleDeletePress = useCallback(
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
            selectJournals(selectedDate);
            toast.show(t('notifications.success.delete'));
          },
        },
      );
    },
    [
      showBottomSheet,
      isLoading,
      removeJournal,
      selectJournals,
      selectedDate,
      toast,
      hideBottomSheet,
    ],
  );

  useEffect(() => {
    selectJournals(selectedDate);
  }, [selectJournals]);

  const { userName } = userInfo || '';

  // useEffect(() => {
  //   const loadSentence = async () => {
  //     const result = await gemini.getDailyPrompt();
  //     toast.show(result.text || '');
  //   };
  //
  //   loadSentence();
  // }, []);

  return (
    <ScrollView overScrollMode="always">
      <ViewContainer edges={['top', 'bottom']} padded>
        <S.ContentHeaderContainer>
          <WelcomeZone userName={userName} />
          <WeekDay />

          <HomeJournalCard
            journals={selectedJournals}
            onDeletePress={handleDeletePress}
            isToday={isToday}
          />
        </S.ContentHeaderContainer>
      </ViewContainer>
    </ScrollView>
  );
}
