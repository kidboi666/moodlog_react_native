import { useQuery } from '@tanstack/react-query'
import { useGlobalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { EntriesJournalDisplay } from '@/components/features/entries'
import { EmptyJournal } from '@/components/features/journal'
import { Layout } from '@/constants'
import { JournalQueries } from '@/queries'
import { ISOMonthString, Journal } from '@/types'
import { groupJournalsByDate, groupJournalsByMonth } from '@/utils'

type GroupedJournalItem = [string, Journal[]]

export default function EntriesScreen() {
  const { selectedMonth: monthString } = useGlobalSearchParams()
  const selectedMonth = monthString as ISOMonthString
  const { data: journals, isFetching } = useQuery(
    JournalQueries.getJournalsByMonth(selectedMonth),
  )
  const groupedJournalsByMonth = journals && groupJournalsByMonth(journals)
  const monthlyJournals = groupedJournalsByMonth?.[selectedMonth] || []
  const groupedJournalsByDate = groupJournalsByDate(monthlyJournals)

  if (isFetching) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.animatedView}>
      <FlatList
        data={groupedJournalsByDate}
        keyExtractor={(item: GroupedJournalItem) => item[0]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyJournal variant='entries' />
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
