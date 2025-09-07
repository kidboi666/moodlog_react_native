import { useGlobalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { EntriesJournalDisplay } from '@/src/features/entries/components'
import { useMonthlyEntries } from '@/src/features/entries/hooks'
import { EmptyJournal } from '@/src/features/journal'
import { LAYOUT } from '@/src/shared/constants'
import { ISOMonthString, Journal } from '@/src/shared/types'

type GroupedJournalItem = [string, Journal[]]

const AnimatedScreenView = Animated.createAnimatedComponent(View)

export default function EntriesScreen() {
  const { selectedMonth: monthString } = useGlobalSearchParams()
  const selectedMonth = monthString as ISOMonthString
  const { isLoading, journals } = useMonthlyEntries(selectedMonth)

  if (isLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <AnimatedScreenView entering={FadeIn.duration(800)}>
      <FlatList
        data={journals}
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
