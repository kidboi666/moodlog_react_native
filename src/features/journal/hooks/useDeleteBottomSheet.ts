import { useCallback } from 'react'

import { useBottomSheet } from '@/src/data/store'
import { LAYOUT } from '@/src/shared/constants'
import { BottomSheetType } from '@/src/shared/types'
import { toSingle } from '@/src/shared/utils'

export function useDeleteBottomSheet(journalId: number) {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()

  const handleDeleteSheetOpen = useCallback(() => {
    if (!journalId) return

    showBottomSheet(BottomSheetType.DELETE_JOURNAL, LAYOUT.SNAP_POINTS.DELETE, {
      journalId: Number(toSingle(journalId)),
      hideBottomSheet,
    })
  }, [journalId])

  return {
    onDeleteSheetOpen: handleDeleteSheetOpen,
  }
}
