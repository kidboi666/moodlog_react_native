import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'tamagui'

import { DELETE_JOURNAL_SNAP_POINTS } from '@/constants'
import { useCalendar } from '@/hooks'
import { useAuth, useBottomSheet, useJournal } from '@/store'
import { BottomSheetType } from '@/types'

import { HomeJournalCard } from '@/components/features/home/HomeJournalCard'
import { WeekDay } from '@/components/features/home/WeekDay'
import { WelcomeZone } from '@/components/features/home/WelcomeZone'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/home/Home.styled'

export default function HomeScreen() {
  const { t } = useTranslation()
  const toast = useToastController()
  const { isToday, selectedDate } = useCalendar()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const userName = useAuth(state => state.userInfo.userName) || 'Guest'
  const selectedJournals = useJournal(state => state.selectedJournals)
  const selectJournals = useJournal(state => state.selectJournals)
  const isLoading = useJournal(state => state.isLoading)
  const removeJournal = useJournal(state => state.removeJournal)

  const openDeleteSheet = useCallback(
    (id: string) => {
      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        {
          journalId: id,
          isLoading,
          hideBottomSheet,
          onDelete: removeJournal,
          onSuccess: () => {
            selectJournals(selectedDate)
            toast.show(t('notifications.success.delete'))
          },
        },
      )
    },
    [
      showBottomSheet,
      isLoading,
      removeJournal,
      selectJournals,
      hideBottomSheet,
      selectedDate,
      toast,
      t,
    ],
  )

  return (
    <ScrollView overScrollMode='always' keyboardShouldPersistTaps='handled'>
      <ViewContainer edges={['top', 'bottom']} padded>
        <S.ContentHeaderContainer>
          <WelcomeZone userName={userName} />
          <WeekDay />
          <HomeJournalCard
            journals={selectedJournals}
            openDeleteSheet={openDeleteSheet}
            isToday={isToday}
          />
        </S.ContentHeaderContainer>
      </ViewContainer>
    </ScrollView>
  )
}
