import { useQuery } from '@tanstack/react-query'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { IconButton, useTheme } from 'react-native-paper'

import { JournalTimeZone } from '@/components/features/journal/JournalTimeZone'
import { BackButton } from '@/components/shared'
import { Layout } from '@/constants'
import { JournalQueries } from '@/queries'
import { useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { toSingle } from '@/utils'

export default function JournalLayout() {
  const theme = useTheme()
  const { journalId, isNewJournal } = useLocalSearchParams()
  const router = useRouter()
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const { data: journal } = useQuery(
    JournalQueries.getJournalById(Number(toSingle(journalId))),
  )

  const handleDeleteSheetOpen = () => {
    if (!journal) return

    showBottomSheet(BottomSheetType.DELETE_JOURNAL, Layout.SNAP_POINTS.DELETE, {
      journalId: Number(toSingle(journalId)),
      hideBottomSheet,
      localDate: journal.localDate,
    })
  }

  const handleGoBack = () => {
    isNewJournal === 'true' ? router.dismiss(2) : router.back()
  }

  const memoizedStyles = useMemo(
    () => ({
      container: {
        backgroundColor: theme.colors.background,
      },
    }),
    [theme],
  )

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <JournalTimeZone journal={journal} />,
        headerRight: () => (
          <IconButton icon='delete' onPress={handleDeleteSheetOpen} />
        ),
        headerLeft: () => (
          <IconButton icon='arrow-left' onPress={handleGoBack} />
        ),
        headerShadowVisible: false,
        headerStyle: memoizedStyles.container,
        contentStyle: memoizedStyles.container,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='[journalId]' />
    </Stack>
  )
}
