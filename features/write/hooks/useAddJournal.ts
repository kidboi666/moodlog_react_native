import { useToastController } from '@tamagui/toast'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'

import { JournalService } from '@/features/journal/services'
import { JournalUtils } from '@/features/journal/utils'
import { DelayMS } from '@/shared/constants'
import { useJournal, useUI } from '@/shared/store'
import { Draft } from '@/shared/types'

export const useAddJournal = (draft: Draft) => {
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToastController()
  const setLoading = useUI(state => state.setLoading)
  const setNavigating = useUI(state => state.setNavigating)
  const store = useJournal(state => state.store)
  const updateStore = useJournal(state => state.updateStore)
  const selectedJournals = useJournal(state => state.selectedJournals)
  const selectJournals = useJournal(state => state.selectJournals)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = useCallback(() => {
    if (!draft.content.trim()) {
      toast.show('내용을 입력해주세요', { preset: 'notice' })
      return
    }

    try {
      setLoading(true)
      const { newStore, newJournal } = JournalService.createJournal(
        store,
        draft,
      )
      updateStore(newStore)
      const newSelectedJournals = JournalUtils.syncSelectedJournalsAfterCreate(
        selectedJournals,
        newJournal,
      )
      selectJournals(newSelectedJournals)

      toast.show(t('notifications.success.journal.title'), {
        message: t('notifications.success.journal.message'),
        preset: 'success',
      })

      setIsSubmitted(true)
      setNavigating(true)
      Keyboard.dismiss()

      setTimeout(() => {
        router.replace({
          pathname: '/(tabs)/journal/[journalId]',
          params: { journalId: newJournal.id, isNewJournal: 'true' },
        })
        setTimeout(() => setNavigating(false), 0)
      }, DelayMS.ROUTE)
    } catch (error) {
      console.error('일기 저장 실패:', error)
    } finally {
      setLoading(false)
    }
  }, [draft, toast, updateStore, t, router, setNavigating, setLoading])

  return {
    onSubmit: handleSubmit,
    isSubmitted,
  }
}
