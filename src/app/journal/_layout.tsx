import { useQuery } from '@tanstack/react-query'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { IconButton } from 'react-native-paper'

import { JournalTimeZone } from '@/components/features/journal/JournalTimeZone'
import { Layout } from '@/constants'
import { useThemedStyles } from '@/hooks'
import { JournalQueries } from '@/queries'
import { useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { toSingle } from '@/utils'

export default function JournalLayout() {
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

  const themedStyles = useThemedStyles(({ colors }) => ({
    container: {
      backgroundColor: colors.background.pure,
    },
  }))

  return (
    <Stack
      screenOptions={{
        headerStyle: themedStyles.container,
        headerShadowVisible: false,
        headerTitle: () => <JournalTimeZone journal={journal} />,
        headerLeft: () => (
          <IconButton
            mode='contained-tonal'
            icon='arrow-left'
            onPress={handleGoBack}
          />
        ),
        headerRight: () => (
          <IconButton
            mode='contained-tonal'
            icon='delete'
            onPress={handleDeleteSheetOpen}
          />
        ),
        contentStyle: themedStyles.container,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='[journalId]' />
    </Stack>
  )
}
