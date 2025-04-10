import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'tamagui'

import { HomeJournalCard } from '@/core/components/features/home/HomeJournalCard'
import { WeekDay } from '@/core/components/features/home/WeekDay'
import { WelcomeZone } from '@/core/components/features/home/WelcomeZone'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { DELETE_JOURNAL_SNAP_POINTS } from '@/core/constants/size'
import { useCalendar } from '@/core/hooks/useCalendar'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { useJournal } from '@/core/store/journal.store'
import { useUser } from '@/core/store/user.store'
import * as S from '@/styles/screens/home/Home.styled'
import { BottomSheetType } from '@/types/bottom-sheet.types'

export default function Screen() {
  const selectedJournals = useJournal(state => state.selectedJournals)
  const selectJournals = useJournal(state => state.selectJournals)
  const isLoading = useJournal(state => state.isLoading)
  const removeJournal = useJournal(state => state.removeJournal)
  const userInfo = useUser(state => state.userInfo)
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const { isToday, selectedDate } = useCalendar()
  const toast = useToastController()
  const { t } = useTranslation()

  const openDeleteSheet = useCallback(
    (id: string) => {
      const bottomSheetProps = {
        journalId: id,
        isLoading,
        onDelete: removeJournal,
        hideBottomSheet,
        onSuccess: () => {
          selectJournals(selectedDate)
          toast.show(t('notifications.success.delete'))
        },
      }

      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        bottomSheetProps,
      )
    },
    [
      showBottomSheet,
      isLoading,
      removeJournal,
      selectJournals,
      selectedDate,
      toast,
      hideBottomSheet,
      t,
    ],
  )

  const userName = userInfo?.userName || 'Guest'

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
