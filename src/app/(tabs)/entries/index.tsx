import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { DateHeader, GardenSection } from '@/components/features/entries'
import { EmptyJournal, JournalCard } from '@/components/features/journal'
import { H1, ViewContainer } from '@/components/shared'
import { useCalendar, useDeleteJournal } from '@/hooks'
import { JournalQueries } from '@/queries'
import { TimeRange } from '@/types'
import { JournalUtils } from '@/utils'

export default function EntriesScreen() {
  const { t } = useTranslation()
  const { openDeleteSheet } = useDeleteJournal()
  const { selectedMonth, onSelectedMonthChange, isSelectedMonth } =
    useCalendar()
  const { data: journals } = useQuery(
    JournalQueries.getJournals(TimeRange.MONTHLY, selectedMonth),
  )

  const groupedJournals = useMemo(() => {
    if (!Array.isArray(journals) || journals.length === 0) {
      return []
    }
    return JournalUtils.groupJournalsByDate(journals)
  }, [journals])

  return (
    <ScrollView>
      <ViewContainer edges={['top']} padded gap='$4'>
        <H1>{t('entries.title')}</H1>
        <GardenSection
          selectedMonth={selectedMonth}
          onSelectedMonthChange={onSelectedMonthChange}
          isSelectedMonth={isSelectedMonth}
        />

        <YStack gap='$6'>
          {Array.isArray(journals) && journals.length > 0 ? (
            groupedJournals.map(([date, journals]) => (
              <YStack key={date} gap='$2'>
                <DateHeader date={date} />
                {journals.map(journal => {
                  const { content, imageUri, id, createdAt, mood } = journal
                  return (
                    <JournalCard
                      key={id}
                      journalId={id}
                      content={content}
                      imageUri={imageUri}
                      createdAt={createdAt}
                      mood={mood}
                      openDeleteSheet={openDeleteSheet}
                    />
                  )
                })}
              </YStack>
            ))
          ) : (
            <EmptyJournal />
          )}
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}
