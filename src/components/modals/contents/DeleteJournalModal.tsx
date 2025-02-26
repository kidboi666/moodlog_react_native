import { Button, H3, Paragraph, YStack } from 'tamagui';
import React from 'react';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { useJournal } from '@/store/hooks/useJournal';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface Props {
  journalId: string;
}

export const DeleteJournalModal = ({ journalId }: Props) => {
  const { dismissAll } = useBottomSheetModal();
  const router = useRouter();
  const { removeJournal } = useJournal();
  const { t } = useTranslation();

  return (
    <YStack gap="$4">
      <H3 text="center">{t('modal.deleteJournal.title')}</H3>
      <Paragraph text="center" color="$gray11">
        {t('modal.deleteJournal.description')}
      </Paragraph>
      <YStack gap="$3" mt="$2">
        <Button
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          bg="$red8"
          fontWeight="800"
          onPress={() => {
            removeJournal(journalId);
            router.back();
            dismissAll();
          }}
          pressStyle={PRESS_STYLE}
        >
          {t('button.delete')}
        </Button>
        <Button
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          fontWeight="800"
          onPress={() => dismissAll()}
          pressStyle={PRESS_STYLE}
        >
          {t('button.cancel')}
        </Button>
      </YStack>
    </YStack>
  );
};
