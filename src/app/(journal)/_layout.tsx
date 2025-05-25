import { useQuery } from '@tanstack/react-query'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { IconButton, useTheme } from 'react-native-paper'

import { JournalTimeZone } from '@/components/features/journal'
import { Layout } from '@/constants'
import { JournalQueries } from '@/queries'
import { useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { toSingle } from '@/utils'

export default function JournalLayout() {
  const theme = useTheme()
  const { journalId, source } = useGlobalSearchParams()
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
          <IconButton
            icon='arrow-left'
            onPress={() =>
              source === 'create' ? router.replace('/home') : router.back()
            }
          />
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
