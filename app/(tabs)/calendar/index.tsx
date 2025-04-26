import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { Delay, H1, ViewContainer } from '@/shared/components'
import { ANIMATION_DELAY_MS } from '@/shared/constants'
import { useJournal } from '@/shared/store'

import { DateHeader, GardenSection } from '@/features/entries/components'
import { EmptyJournal, JournalCard } from '@/features/journal/components'
import { useDeleteJournal } from '@/features/journal/hooks'
import { JournalUtils } from '@/features/journal/utils'

export default function EntriesScreen() {
  const { t } = useTranslation()
  const { openDeleteSheet } = useDeleteJournal()
  const selectedJournals = useJournal(state => state.selectedJournals)

  const groupedJournals = useMemo(() => {
    if (!Array.isArray(selectedJournals) || selectedJournals.length === 0) {
      return []
    }
    return JournalUtils.groupJournalsByDate(selectedJournals)
  }, [selectedJournals])

  return (
    <ScrollView>
      <ViewContainer edges={['top']} padded gap='$4'>
        <H1>{t('entries.title')}</H1>
        <Delay delay={ANIMATION_DELAY_MS[0]}>
          <GardenSection />
        </Delay>

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
