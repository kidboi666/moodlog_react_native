import { useJournal } from '@/store/hooks/useJournal';
import { Button, XStack } from 'tamagui';
import { ChevronLeft, Trash2 } from '@tamagui/lucide-icons';
import React from 'react';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { BottomModal } from '@/components/modals/BottomModal';
import { DeleteJournalModal } from '@/components/modals/contents/DeleteJournalModal';
import { RenderDate } from '@/screens/journal/RenderDate';
import { router } from 'expo-router';
import { useBottomModal } from '@/hooks/useBottomModal';
import { RenderTime } from '@/screens/journal/RenderTime';
import { RenderDay } from '@/screens/journal/RenderDay';
import * as S from './JournalHeader.styled';

export default function JournalHeader() {
  const { selectedJournal } = useJournal();
  const { modalRef, openModal } = useBottomModal();

  if (!selectedJournal) return null;

  return (
    <>
      <S.HeaderContainer>
        <S.BackButton
          icon={<ChevronLeft size="$1" />}
          onPress={() => router.back()}
        />
        <S.DateContainer>
          <RenderDate localDate={selectedJournal.localDate} />
          <XStack gap="$2">
            <RenderDay createdAt={selectedJournal.createdAt} />
            <RenderTime createdAt={selectedJournal.createdAt} />
          </XStack>
        </S.DateContainer>

        <Button
          unstyled
          animation="quick"
          rounded="$4"
          p="$3"
          icon={<Trash2 size="$1" />}
          enterStyle={ENTER_STYLE}
          pressStyle={PRESS_STYLE}
          onPress={openModal}
        />
      </S.HeaderContainer>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={selectedJournal.id} />
      </BottomModal>
    </>
  );
}
