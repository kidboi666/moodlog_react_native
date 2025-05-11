import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { BaseText, H3, PressableButton } from '@/components/shared'
import { useDeleteJournal } from '@/queries'
import type { BottomSheetProps, BottomSheetType } from '@/types'
import { BottomSheetContainer } from '../../BottomSheetContainer'

function _DeleteJournalModal({
  journalId,
  localDate,
  hideBottomSheet,
}: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) {
  const { t } = useTranslation()
  const { mutate: onDelete, isPending } = useDeleteJournal(
    hideBottomSheet,
    localDate,
  )

  return (
    <BottomSheetContainer>
      <H3 text='center'>{t('modals.deleteJournal.title')}</H3>
      <BaseText color='$color11'>
        {t('modals.deleteJournal.description')}
      </BaseText>
      <YStack gap='$3' mt='$2'>
        <PressableButton
          bg='$red9'
          color='white'
          onPress={() => onDelete(journalId)}
          disabled={isPending}
          loading={isPending}
        >
          {t('common.delete')}
        </PressableButton>
        <PressableButton onPress={hideBottomSheet} disabled={isPending}>
          {t('common.cancel')}
        </PressableButton>
      </YStack>
    </BottomSheetContainer>
  )
}

export const DeleteJournalModal = memo(_DeleteJournalModal)

DeleteJournalModal.displayName = 'DeleteJournalModal'
