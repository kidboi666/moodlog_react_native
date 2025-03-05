import { useJournal } from '@/store/hooks/useJournal';
import { Button } from 'tamagui';
import { ChevronLeft, Trash2 } from '@tamagui/lucide-icons';
import React from 'react';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { BottomModal } from '@/components/modals/BottomModal';
import { DeleteJournalModal } from '@/components/modals/contents/DeleteJournalModal';
import { CurrentDate } from '@/components/CurrentDate';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { router } from 'expo-router';
import { useBottomModal } from '@/hooks/useBottomModal';
import { CONTAINER_SPACING } from '@/constants/size';

export default function JournalHeader() {
  const { selectedJournal } = useJournal();
  const { modalRef, openModal } = useBottomModal();

  if (!selectedJournal) return null;

  return (
    <>
      <HeaderContainer items="center" pl={CONTAINER_SPACING}>
        <Button
          unstyled
          animation="quick"
          rounded="$4"
          p="$3"
          icon={<ChevronLeft size="$1" />}
          onPress={() => router.back()}
          enterStyle={ENTER_STYLE}
          pressStyle={PRESS_STYLE}
        />
        <CurrentDate
          animation="quick"
          pressStyle={PRESS_STYLE}
          color="$gray8"
          fontSize="$5"
          fontWeight="800"
          enterStyle={ENTER_STYLE}
          localDate={selectedJournal.localDate}
        />

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
      </HeaderContainer>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={selectedJournal.id} />
      </BottomModal>
    </>
  );
}
