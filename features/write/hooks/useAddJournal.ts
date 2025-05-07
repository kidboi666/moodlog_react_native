import { useToastController } from '@tamagui/toast'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'

import { JournalService } from '@/features/journal/services'
import { JournalUtils } from '@/features/journal/utils'
import { DelayMS } from '@/shared/constants'
import { useJournal, useUI } from '@/shared/store'
import { Draft, JournalMood, MoodLevel } from '@/shared/types'
import { useSQLiteContext } from 'expo-sqlite'

export const useAddJournal = ({
  draftContent,
  draftMoodId,
  draftMoodLevel,
  draftImageUri,
}: {
  draftContent: string
  draftMoodId: string
  draftMoodLevel: MoodLevel
  draftImageUri: string[]
}) => {
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToastController()
  const setLoading = useUI(state => state.setLoading)
  const db = useSQLiteContext()
  const journalService = new JournalService(db)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = useCallback(async () => {
    if (!draftContent.trim()) {
      toast.show('내용을 입력해주세요', { preset: 'notice' })
      return
    }

    const newDraft = {
      content: draftContent,
      mood: {
        id: draftMoodId,
        level: draftMoodLevel,
      } as JournalMood,
      imageUri: draftImageUri,
    } as Draft
    try {
      setLoading(true)
      await journalService.createJournal(newDraft)

      toast.show(t('notifications.success.journal.title'), {
        message: t('notifications.success.journal.message'),
        preset: 'success',
      })

      setIsSubmitted(true)
      Keyboard.dismiss()

      setTimeout(() => {
        router.replace({
          pathname: '/(tabs)/journal/[journalId]',
          params: { journalId: newJournal.id, isNewJournal: 'true' },
        })
        setTimeout(() => setLoading(false), 0)
      }, DelayMS.ROUTE)
    } catch (error) {
      console.error('일기 저장 실패:', error)
    } finally {
      setLoading(false)
    }
  }, [
    draftMoodId,
    draftMoodLevel,
    draftContent,
    draftImageUri,
    toast,
    t,
    router,
    setLoading,
  ])

  return {
    onSubmit: handleSubmit,
    isSubmitted,
  }
}
