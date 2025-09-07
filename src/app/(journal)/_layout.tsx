import { useQuery } from '@tanstack/react-query'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { IconButton, useTheme } from 'react-native-paper'

import { JournalQueries } from '@/src/data/queries'
import { useBottomSheet } from '@/src/data/store'
import { JournalTimeZone } from '@/src/features/journal'
import { LAYOUT } from '@/src/shared/constants'
import { BottomSheetType } from '@/src/shared/types'
import { toSingle } from '@/src/shared/utils'

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

    showBottomSheet(BottomSheetType.DELETE_JOURNAL, LAYOUT.SNAP_POINTS.DELETE, {
      journalId: Number(toSingle(journalId)),
      hideBottomSheet,
      localDate: journal.localDate,
    })
  }

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
              source === 'create' ? router.replace('/(tabs)') : router.back()
            }
          />
        ),
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        contentStyle: { backgroundColor: theme.colors.background },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='[journalId]' />
    </Stack>
  )
}
