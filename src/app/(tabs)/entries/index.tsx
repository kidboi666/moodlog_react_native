import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import { EntriesJournalDisplay } from '@/components/features/entries'
import { EmptyJournal } from '@/components/features/journal'
import { Layout } from '@/constants'
import { JournalQueries } from '@/queries'
import { ISOMonthString, Journal } from '@/types'
import { groupJournalsByDate, groupJournalsByMonth } from '@/utils'
import { ActivityIndicator } from 'react-native-paper'

type GroupedJournalItem = [string, Journal[]]

export default function EntriesScreen() {
  const { selectedMonth: monthString } = useLocalSearchParams()
  const selectedMonth = monthString as ISOMonthString
  const { data: journals, isFetching } = useQuery(
    JournalQueries.getJournalsByMonth(selectedMonth),
  )

  const groupedJournalsByMonth = useMemo(() => {
    if (!Array.isArray(journals) || journals.length === 0) return {}
    return groupJournalsByMonth(journals)
  }, [journals])
  const monthlyJournals = groupedJournalsByMonth[selectedMonth] || []
  const groupedJournalsByDate = groupJournalsByDate(monthlyJournals)

  if (isFetching) {
    return <ActivityIndicator size='large' />
  }

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.animatedView}>
      {Array.isArray(journals) && journals.length > 0 ? (
        <FlatList
          data={groupedJournalsByDate}
          keyExtractor={(item: GroupedJournalItem) => item[0]}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <EmptyJournal />
            </View>
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
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    paddingTop: Layout.SPACE.CONTAINER_PADDING_TOP / 4,
    paddingBottom: Layout.SPACE.CONTAINER_PADDING_BOTTOM,
  },
  emptyContainer: {
    padding: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
