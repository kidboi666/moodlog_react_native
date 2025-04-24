import { JournalService } from '@/features/journal/services/journal.service'
import { useBottomSheet, useJournal, useUI } from '@/store'
import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DELETE_JOURNAL_SNAP_POINTS } from 'shared/constants'
import { BottomSheetType, ISODateString, ISOMonthString } from 'shared/types'

export const useDeleteJournal = (
  selectedDate: ISODateString | ISOMonthString | null,
) => {
  const { t } = useTranslation()
  const toast = useToastController()
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const selectJournals = useJournal(state => state.selectJournals)
  const updateStore = useJournal(state => state.updateStore)
  const store = useJournal(state => state.store)
  const isLoading = useUI(state => state.isLoading)

  const handleDeleteJournal = useCallback(
    (id: string) => () => {
      const newStore = JournalService.removeJournal(store, id)
      updateStore(newStore)
    },
    [store, updateStore],
  )

  const handleDeleteSuccess = useCallback(() => {
    selectJournals(selectedDate)
    toast.show(t('notifications.success.delete'))
  }, [selectJournals, toast, t])

  const openDeleteSheet = useCallback(
    (id: string) => {
      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        {
          journalId: id,
          isLoading,
          hideBottomSheet,
          onDelete: handleDeleteJournal,
          onSuccess: handleDeleteSuccess,
        },
      )
    },
    [
      showBottomSheet,
      isLoading,
      selectJournals,
      hideBottomSheet,
      selectedDate,
      toast,
      t,
    ],
  )

  return {
    openDeleteSheet,
  }
}
