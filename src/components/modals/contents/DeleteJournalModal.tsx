import { Button, Text, YStack } from 'tamagui';
import React from 'react';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { PRESS_STYLE } from '@/constants/styles';
import { useJournal } from '@/store/hooks/useJournal';
import { useRouter } from 'expo-router';

interface Props {
  journalId: string;
}

export const DeleteJournalModal = ({ journalId }: Props) => {
  const { dismissAll } = useBottomSheetModal();
  const router = useRouter();
  const { removeJournal } = useJournal();
  return (
    <YStack gap="$4">
      <Text text="center" fontSize="$5" fontWeight="500">
        Delete Journal
      </Text>
      <Text text="center" color="$gray11">
        Are you sure you want to delete this journal? This action cannot be
        undone.
      </Text>
      <YStack gap="$3" mt="$2">
        <Button
          animation="quick"
          bg="$red8"
          fontWeight="800"
          onPress={() => {
            removeJournal(journalId);
            router.back();
            dismissAll();
          }}
          pressStyle={PRESS_STYLE}
        >
          Delete
        </Button>
        <Button
          animation="quick"
          fontWeight="800"
          onPress={() => dismissAll()}
          pressStyle={PRESS_STYLE}
        >
          Cancel
        </Button>
      </YStack>
    </YStack>
  );
};
