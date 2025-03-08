import { useJournal } from '@/store/hooks/useJournal';
import React from 'react';
import { BottomModal } from '@/components/modals/BottomModal';
import { DeleteJournalModal } from '@/components/modals/contents/DeleteJournalModal';
import { router } from 'expo-router';
import { useBottomModal } from '@/hooks/useBottomModal';
import * as S from './JournalHeader.styled';

export default function JournalHeader() {
  const { selectedJournal } = useJournal();
  const { modalRef, openModal } = useBottomModal();

  if (!selectedJournal) return null;

  return (
    <>
      <S.HeaderContainer>
        <S.BackButton icon={S.BackIcon} onPress={() => router.back()} />
        <S.DateContainer>
          <S.DateText localDate={selectedJournal.localDate} />
          <S.DayWithTimeBox>
            <S.DayText createdAt={selectedJournal.createdAt} />
            <S.TimeText createdAt={selectedJournal.createdAt} />
          </S.DayWithTimeBox>
        </S.DateContainer>

        <S.DeleteButton icon={S.DeleteIcon} onPress={openModal} />
      </S.HeaderContainer>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={selectedJournal.id} />
      </BottomModal>
    </>
  );
}
