import { useToastController } from '@tamagui/toast'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { DELETE_JOURNAL_SNAP_POINTS } from '@/constants'
import { useCalendar } from '@/hooks'
import { useBottomSheet, useJournal, useUI } from '@/store'
import { BottomSheetType } from '@/types'

import {
  HomeJournalCard,
  WeekDay,
  WelcomeZone,
} from '@/components/features/home'
import { ViewContainer } from '@/components/shared'
import { WaveEffect } from '@/components/shared/WaveEffect'

export default function HomeScreen() {
  const { t } = useTranslation()
  const toast = useToastController()
  const { isToday, selectedDate } = useCalendar()

  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const selectedJournals = useJournal(state => state.selectedJournals)
  const selectJournals = useJournal(state => state.selectJournals)
  const isLoading = useUI(state => state.isLoading)
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
        <YStack gap='$4'>
          <WelcomeZone />
          <WeekDay />
          <HomeJournalCard
            journals={selectedJournals}
            openDeleteSheet={openDeleteSheet}
            isToday={isToday}
          />
        </YStack>

        <WaveEffect />
      </ViewContainer>
    </ScrollView>
  )
}
