import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet } from 'react-native'
import { View, XStack, YStack } from 'tamagui'

import { EntriesJournalDisplay } from '@/components/features/entries'
import { EmptyJournal } from '@/components/features/journal'
import {
  Delay,
  H1,
  H3,
  PressableButton,
  ViewContainer,
} from '@/components/shared'
import { DelayMS, Layout } from '@/constants'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'
import { Journal } from '@/types'
import {
  convertMonthString,
  groupJournalsByDate,
  groupJournalsByMonth,
} from '@/utils'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'

type GroupedJournalItem = [string, Journal[]]

export default function EntriesScreen() {
  const { t } = useTranslation()
  const { selectedMonth, onSelectedMonthChange, selectedYear } = useCalendar()
  const { data: journals } = useQuery(
    JournalQueries.getJournalsByYear(selectedYear),
  )
  const groupedJournalsByMonth = useMemo(() => {
    if (!Array.isArray(journals) || journals.length === 0) return {}
    return groupJournalsByMonth(journals)
  }, [journals])
  const monthlyJournals = groupedJournalsByMonth[selectedMonth] || []
  const groupedJournalsByDate = groupJournalsByDate(monthlyJournals)

  const handleLeftPress = useCallback(() => {
    const monthString = convertMonthString(selectedMonth, 'prev')
    onSelectedMonthChange(monthString)
  }, [onSelectedMonthChange, selectedMonth])

  const handleRightPress = useCallback(() => {
    const monthString = convertMonthString(selectedMonth, 'next')
    onSelectedMonthChange(monthString)
  }, [onSelectedMonthChange, selectedMonth])

  const selectedMonthToRender = selectedMonth.replace('-', '.')

  return (
    <ViewContainer
      edges={['top']}
      Header={
        <XStack justify='space-between' items='center' width='100%' py='$2'>
          <PressableButton icon={ArrowLeft} onPress={handleLeftPress} />
          <H3>{selectedMonthToRender}</H3>
          <PressableButton icon={ArrowRight} onPress={handleRightPress} />
        </XStack>
      }
    >
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
    paddingTop: Layout.SPACE.CONTAINER_PADDING_TOP / 4,
    paddingBottom: Layout.SPACE.CONTAINER_PADDING_BOTTOM,
  },
})
