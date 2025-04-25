import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { JournalUtils } from '@/features/journal/utils'
import { DELETE_JOURNAL_SNAP_POINTS } from '@/shared/constants'
import { BottomSheetType } from '@/shared/types'
import { useBottomSheet, useJournal, useUI } from 'shared/store'

export const useDeleteJournal = (onSuccess?: () => void) => {
  const { t } = useTranslation()
  const toast = useToastController()
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const selectedJournals = useJournal(state => state.selectedJournals)
  const selectJournals = useJournal(state => state.selectJournals)
  const updateStore = useJournal(state => state.updateStore)
  const store = useJournal(state => state.store)
  const isLoading = useUI(state => state.isLoading)

  const handleDeleteJournal = useCallback(
    (id: string) => {
      const newStore = JournalUtils.removeJournal(store, id)
      updateStore(newStore)
      const newSelectedJournals = JournalUtils.syncSelectedJournalsAfterDelete(
        selectedJournals,
        id,
      )
      selectJournals(newSelectedJournals)

      onSuccess?.()
      toast.show(t('notifications.success.delete'))
    },
    [store, updateStore],
  )

  const openDeleteSheet = useCallback(
    (id: string) =>
      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        {
          journalId: id,
          isLoading,
          hideBottomSheet,
          onDelete: handleDeleteJournal,
        },
      ),
    [showBottomSheet, isLoading, handleDeleteJournal, hideBottomSheet],
  )

  return {
    openDeleteSheet,
  }
}
