import { useJournal } from '@/store/hooks/useJournal';
import { Button, View, XStack } from 'tamagui';
import { ALargeSmall, ChevronLeft, Trash2 } from '@tamagui/lucide-icons';
import React, { useRef } from 'react';
import { useApp } from '@/store/hooks/useApp';
import { PRESS_STYLE } from '@/constants/styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomModal } from '@/components/modals/BottomModal';
import { DeleteJournalModal } from '@/components/modals/contents/DeleteJournalModal';
import { CurrentDate } from '@/components/CurrentDate';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { router } from 'expo-router';

export default function JournalHeader() {
  const modalRef = useRef<BottomSheetModal>(null);
  const { selectedJournal } = useJournal();
  const { onChangeFontSize } = useApp();

  if (!selectedJournal) return null;

  return (
    <HeaderContainer>
      <XStack>
        <Button
          unstyled
          p="$2"
          l={0}
          icon={<ChevronLeft size="$1" />}
          onPress={() => router.back()}
          pressStyle={PRESS_STYLE}
        />
        <View width="$3" />
      </XStack>
      <XStack gap="$2" items="center">
        <CurrentDate localDate={selectedJournal.localDate} />
      </XStack>

      <XStack>
        <Button
          unstyled
          p="$2"
          icon={<Trash2 size="$1" />}
          pressStyle={PRESS_STYLE}
          onPress={() => modalRef.current?.present()}
        />
        <Button
          unstyled
          p="$2"
          icon={<ALargeSmall size="$1" />}
          animation="quick"
          onPress={onChangeFontSize}
          pressStyle={PRESS_STYLE}
        />
      </XStack>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={selectedJournal.id} />
      </BottomModal>
    </HeaderContainer>
  );
}
