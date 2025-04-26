import { DELETE_MOOD_SNAP_POINTS } from '@/shared/constants'
import { useBottomSheet, useMood, useUI } from '@/shared/store'
import { BottomSheetType } from '@/shared/types'
import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MoodService } from '../services'

export const useDeleteMood = (onSuccess?: () => void) => {
  const { t } = useTranslation()
  const toast = useToastController()
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const moods = useMood(state => state.moods)
  const removeMood = useMood(state => state.removeMood)
  const isLoading = useUI(state => state.isLoading)

  const handleDeleteMood = useCallback(
    (id: string) => {
      const newStore = MoodService.removeMood(moods, id)
      removeMood(newStore)

      onSuccess?.()
      toast.show(t('notifications.success.delete'))
    },
    [moods, onSuccess, toast],
  )

  const openDeleteSheet = useCallback(
    (id: string) =>
      showBottomSheet(BottomSheetType.DELETE_MOOD, DELETE_MOOD_SNAP_POINTS, {
        moodId: id,
        onDelete: handleDeleteMood,
        isLoading,
        hideBottomSheet,
      }),
    [showBottomSheet, handleDeleteMood, hideBottomSheet],
  )

  return {
    openDeleteSheet,
  }
}
