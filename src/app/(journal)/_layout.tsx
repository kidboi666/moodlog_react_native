import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { IconButton, useTheme } from 'react-native-paper'

import { JournalTimeZone } from '@/src/features/journal/components'
import { useDeleteBottomSheet } from '@/src/features/journal/hooks'
import { toSingle } from '@/src/shared/utils'

export default function JournalLayout() {
  const theme = useTheme()
  const { journalId, source } = useGlobalSearchParams()
  const router = useRouter()
  const { onDeleteSheetOpen } = useDeleteBottomSheet(
    Number(toSingle(journalId)),
  )

  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <JournalTimeZone journalId={Number(toSingle(journalId))} />
        ),
        headerRight: () => (
          <IconButton icon='delete' onPress={onDeleteSheetOpen} />
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
