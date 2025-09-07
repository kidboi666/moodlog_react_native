import { useQuery } from '@tanstack/react-query'
import { useGlobalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { EntriesJournalDisplay } from '@/src/components/features/entries'
import { EmptyJournal } from '@/src/components/features/journal'
import { Layout } from '@/src/constants'
import { JournalQueries } from '@/src/queries'
import { ISOMonthString, Journal } from '@/src/types'
import { groupJournalsByDate, groupJournalsByMonth } from '@/src/utils'

type GroupedJournalItem = [string, Journal[]]

const AnimatedScreenView = Animated.createAnimatedComponent(View)

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
    <AnimatedScreenView entering={FadeIn.duration(800)}>
      <FlatList
        data={groupedJournalsByDate}
        keyExtractor={(item: GroupedJournalItem) => item[0]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyJournal source='entries' />
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
        contentContainerStyle={styles.contentContainer}
      />
    </AnimatedScreenView>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: Layout.SPACE.CONTAINER_PADDING_BOTTOM,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
