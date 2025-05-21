import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet } from 'react-native'
import { XStack, YStack } from 'tamagui'

import { EntriesJournalDisplay } from '@/components/features/entries'
import { EmptyJournal } from '@/components/features/journal'
import { H1, H3, PressableButton, ScreenView } from '@/components/shared'
import { DelayMS, Layout } from '@/constants'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'
import { ISOMonthString, Journal } from '@/types'
import {
  convertMonthString,
  groupJournalsByDate,
  groupJournalsByMonth,
} from '@/utils'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useLocalSearchParams } from 'expo-router'
import Animated, { FadeIn } from 'react-native-reanimated'

type GroupedJournalItem = [string, Journal[]]

export default function EntriesScreen() {
  const { t } = useTranslation()
  const params = useLocalSearchParams()
  const { selectedYear, selectedMonth } = params
  const { data: journals } = useQuery(
    JournalQueries.getJournalsByYear(selectedYear),
  )
  const groupedJournalsByMonth = useMemo(() => {
    if (!Array.isArray(journals) || journals.length === 0) return {}
    return groupJournalsByMonth(journals)
  }, [journals])
  const monthlyJournals = groupedJournalsByMonth[selectedMonth] || []
  const groupedJournalsByDate = groupJournalsByDate(monthlyJournals)

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.animatedView}>
      {Array.isArray(journals) && journals.length > 0 ? (
        <FlatList
          data={groupedJournalsByDate}
          keyExtractor={(item: GroupedJournalItem) => item[0]}
          ListEmptyComponent={<EmptyJournal />}
          ListHeaderComponent={
            <YStack gap='$4'>
              <H1>{t('entries.title')}</H1>
            </YStack>
          }
          renderItem={({ item }: { item: GroupedJournalItem }) => {
            return (
              <EntriesJournalDisplay
                date={item[0]}
                journals={item[1]}
                selectedMonth={selectedMonth}
              />
            )
          }}
          contentContainerStyle={styles.container}
        />
      ) : (
        <EmptyJournal />
      )}
      {/*</ScreenView>*/}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    paddingTop: Layout.SPACE.CONTAINER_PADDING_TOP / 4,
    paddingBottom: Layout.SPACE.CONTAINER_PADDING_BOTTOM,
  },
})
