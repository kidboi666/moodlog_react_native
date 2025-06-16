import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

import { H3 } from '@/components/shared'
import { useDeleteJournal } from '@/queries'
import type { BottomSheetProps, BottomSheetType } from '@/types'
import { BottomSheetContainer } from '../../BottomSheetContainer'

function _DeleteJournalSheet({
  journalId,
  localDate,
  hideBottomSheet,
}: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) {
  const { colors } = useTheme()
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
          mode='contained'
          buttonColor={colors.error}
          textColor={colors.surface}
          onPress={() => onDelete(journalId)}
          disabled={isPending}
          loading={isPending}
        >
          {t('common.delete')}
        </Button>
        <Button mode='outlined' onPress={hideBottomSheet} disabled={isPending}>
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

export const DeleteJournalSheet = memo(_DeleteJournalSheet)
DeleteJournalSheet.displayName = 'DeleteJournalSheet'
