import { useJournalContext } from '@/store/hooks/useJournalContext';
import { useRouter } from 'expo-router';
import { HeaderContainer } from '../HeaderContainer';
import { Button, useTheme, XStack } from 'tamagui';
import { ALargeSmall, ChevronLeft, Trash2 } from '@tamagui/lucide-icons';
import React, { useEffect, useRef, useState } from 'react';
import { IJournal } from '@/types/entries';
import { useAppContext } from '@/store/hooks/useAppContext';
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
  const { journals } = useJournalContext();
  const { onChangeFontSize } = useAppContext();

  useEffect(() => {
    const journal = journals.find(item => item.id === route.params.journalId);
    setJournal(journal);
  }, []);

  if (!journal) return null;

  return (
    <>
      <HeaderContainer>
        <XStack justify="space-between">
          <Button
            unstyled
            p="$2"
            l={0}
            icon={<ChevronLeft size="$1" />}
            onPress={() => router.back()}
            pressStyle={{
              opacity: 0.5,
              scale: 0.9,
            }}
          />
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
