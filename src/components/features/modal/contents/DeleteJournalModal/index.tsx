import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Button, H3 } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
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
      <H3 style={styles.title}>{t('modals.deleteJournal.title')}</H3>
      <Text>{t('modals.deleteJournal.description')}</Text>
      <View style={styles.contentBox}>
        <Button
          variant='danger'
          onPress={() => onDelete(journalId)}
          disabled={isPending}
          loading={isPending}
        >
          {t('common.delete')}
        </Button>
        <Button onPress={hideBottomSheet} disabled={isPending}>
          {t('common.cancel')}
        </Button>
      </View>
    </BottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  contentBox: {
    gap: 12,
    marginTop: 8,
  },
})

export const DeleteJournalModal = memo(_DeleteJournalModal)
DeleteJournalModal.displayName = 'DeleteJournalModal'
