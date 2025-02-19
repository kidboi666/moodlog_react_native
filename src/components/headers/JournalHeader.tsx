import { useJournal } from '@/store/hooks/useJournal';
import { useRouter } from 'expo-router';
import { HeaderContainer } from '../containers/HeaderContainer';
import { Button, useTheme, View, XStack } from 'tamagui';
import { ALargeSmall, ChevronLeft, Trash2 } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import { IJournal } from '@/types/entries';
import { useApp } from '@/store/hooks/useApp';
import { PRESS_STYLE } from '@/constants/styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomModal } from '@/components/modals/BottomModal';
import { DeleteJournalModal } from '@/components/modals/contents/DeleteJournalModal';
import { CurrentDate } from '@/components/CurrentDate';

export default function JournalHeader({ route }) {
  const router = useRouter();
  const theme = useTheme();
  const modalRef = useRef<BottomSheetModal>(null);
  const [journal, setJournal] = useState<IJournal>();
  const { journals } = useJournal();
  const { onChangeFontSize } = useApp();

  useEffect(() => {
    const journal = journals.find(item => item.id === route.params.journalId);
    setJournal(journal);
  }, []);

  if (!journal) return null;

  return (
    <>
      <HeaderContainer>
        <XStack justify="space-between">
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
            <CurrentDate localDate={journal.localDate} />
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
        </XStack>
      </HeaderContainer>
      <BottomModal ref={modalRef}>
        <DeleteJournalModal journalId={journal.id} />
      </BottomModal>
    </>
  );
}
