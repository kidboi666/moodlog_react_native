import { useToastController } from '@tamagui/toast'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'

import { JournalService } from '@/features/journal/services'
import { DelayMS } from '@/shared/constants'
import { JournalDraft } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'

export const useAddJournal = (draft: JournalDraft) => {
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToastController()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { data } = useQuery({
    queryKey: ['journal', draft.localDate],
    queryFn: () => JournalService.createJournal(draft),
  })

  const handleSubmit = useCallback(async () => {
    if (!draft.content.trim()) {
      toast.show('내용을 입력해주세요', { preset: 'notice' })
      return
    }

    try {
      setIsSubmitted(true)
      const journalId = await JournalService.createJournal(draft)

      toast.show(t('notifications.success.journal.title'), {
        message: t('notifications.success.journal.message'),
        preset: 'success',
      })

      setIsSubmitted(true)
      Keyboard.dismiss()

      setTimeout(() => {
        router.replace({
          pathname: '/(tabs)/journal/[journalId]',
          params: {
            journalId: String(journalId),
            isNewJournal: 'true',
          },
        })
        setTimeout(() => setIsSubmitted(false), 0)
      }, DelayMS.ROUTE)
    } catch (error) {
      console.error('일기 저장 실패:', error)
    } finally {
      setIsSubmitted(false)
    }
  }, [draft, toast, t, router])

  return {
    onSubmit: handleSubmit,
    isSubmitted,
  }
}
