import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Layout } from '@/constants'
import { MoodService } from '@/services'
import { useBottomSheet, useMood, useUI } from '@/store'
import { BottomSheetType } from '@/types'

export const useDeleteMood = (onSuccess?: () => void) => {
  const { t } = useTranslation()
  const toast = useToastController()
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const moods = useMood(state => state.moods)
  const removeMood = useMood(state => state.removeMood)
  const isLoading = useUI(state => state.isLoading)
  const setLoading = useUI(state => state.setLoading)

  const handleDeleteMood = useCallback(
    (id: string) => {
      setLoading(true)
      const newStore = MoodService.removeMood(moods, id)
      removeMood(newStore)

      onSuccess?.()
      toast.show(t('notifications.success.delete'))
      setLoading(false)
    },
    [moods, onSuccess, toast, isLoading, setLoading],
  )

  const openDeleteSheet = useCallback(
    (id: string) =>
      showBottomSheet(BottomSheetType.DELETE_MOOD, Layout.SNAP_POINTS.DELETE, {
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
