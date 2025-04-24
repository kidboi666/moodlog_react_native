import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { AnimatedEntry, H1, ViewContainer } from '@/shared/components'
import { ANIMATION_DELAY_MS } from '@/shared/constants'
import { useCalendar } from '@/shared/hooks'
import { JournalService } from '@/shared/services'
import { useJournal } from '@/store'

import { DateHeader, GardenSection } from '@/features/entries/components'
import { EmptyJournal, JournalCard } from '@/features/journal/components'
import { useDeleteJournal } from '@/features/journal/hooks'

export default function EntriesScreen() {
  const { t } = useTranslation()
  const { selectedMonth } = useCalendar()
  const { openDeleteSheet } = useDeleteJournal(selectedMonth)
  const selectedJournals = useJournal(state => state.selectedJournals)

  const groupedJournals = useMemo(() => {
    if (!Array.isArray(selectedJournals) || selectedJournals.length === 0) {
      return []
    }
    return JournalService.groupJournalsByDate(selectedJournals)
  }, [selectedJournals])

  return (
    <ScrollView>
      <ViewContainer edges={['top']} padded gap='$4'>
        <H1>{t('entries.title')}</H1>
        <AnimatedEntry delay={ANIMATION_DELAY_MS[0]}>
          <GardenSection />
        </AnimatedEntry>

        <YStack gap='$6'>
          {Array.isArray(selectedJournals) && selectedJournals.length > 0 ? (
            groupedJournals.map(([date, journals]) => (
              <YStack key={date} gap='$2'>
                <DateHeader date={date} />
                {journals.map(journal => {
                  const { content, imageUri, id, createdAt, mood } = journal
                  return (
                    <JournalCard
                      key={id}
                      id={id}
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
            <EmptyJournal isToday={false} />
          )}
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}
