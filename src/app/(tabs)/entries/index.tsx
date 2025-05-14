import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet } from 'react-native'
import { YStack } from 'tamagui'

import { EntriesJournalDisplay } from '@/components/features/entries'
import { EmptyJournal } from '@/components/features/journal'
import { Delay, H1, ViewContainer } from '@/components/shared'
import { DelayMS, Layout } from '@/constants'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'
import { Journal, TimeRange } from '@/types'
import { groupJournalsByDate, groupJournalsByMonth } from '@/utils'

type GroupedJournalItem = [string, Journal[]]

export default function EntriesScreen() {
  const { t } = useTranslation()
  const {
    selectedMonth,
    onSelectedMonthChange,
    selectedYear,
    isSelectedMonth,
  } = useCalendar()
  const { data: journals } = useQuery(
    JournalQueries.getJournals(TimeRange.YEARLY, selectedYear),
  )
  const groupedJournalsByMonth = useMemo(() => {
    if (!Array.isArray(journals) || journals.length === 0) return {}
    return groupJournalsByMonth(journals)
  }, [journals])

  if (!journals) return null
  const monthlyJournals = groupedJournalsByMonth[selectedMonth] || []
  const groupedJournalsByDate = groupJournalsByDate(monthlyJournals)

  return (
    <ViewContainer>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
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
      </Delay>
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.SPACE.CONTAINER_PADDING_TOP,
    paddingBottom: Layout.SPACE.CONTAINER_PADDING_BOTTOM,
  },
})
