import { useQuery } from '@tanstack/react-query'
import { useGlobalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { JournalQueries } from '@/src/data/queries'
import { EntriesJournalDisplay } from '@/src/features/entries'
import { EmptyJournal } from '@/src/features/journal'
import { LAYOUT } from '@/src/shared/constants'
import { ISOMonthString, Journal } from '@/src/shared/types'
import { groupJournalsByDate, groupJournalsByMonth } from '@/src/shared/utils'

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
    paddingBottom: LAYOUT.SPACE.CONTAINER_PADDING_BOTTOM,
    paddingHorizontal: LAYOUT.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
