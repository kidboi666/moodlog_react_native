import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { DateHeader, GardenSection } from '@/features/entries/components'
import { EmptyJournal, JournalCard } from '@/features/journal/components'
import { useDeleteJournal } from '@/features/journal/hooks'
import { JournalUtils } from '@/features/journal/utils'
import { MoodService } from '@/features/mood/services'
import { H1, ViewContainer } from '@/shared/components'
import { useJournal } from '@/shared/store'
import { Mood } from '@/shared/types'
import { useSQLiteContext } from 'expo-sqlite'

export default function EntriesScreen() {
  const { t } = useTranslation()
  const db = useSQLiteContext()
  const { openDeleteSheet } = useDeleteJournal()
  const selectedJournals = useJournal(state => state.selectedJournals)
  const moodService = new MoodService(db)
  const [moods, setMoods] = useState<Mood[]>([])

  const groupedJournals = useMemo(() => {
    if (!Array.isArray(selectedJournals) || selectedJournals.length === 0) {
      return []
    }
    return JournalUtils.groupJournalsByDate(selectedJournals)
  }, [selectedJournals])

  useEffect(() => {
    const getMoods = async () => {
      try {
        const moods = await moodService.getMoods()
        if (moods) {
          setMoods(moods)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getMoods()
  }, [])

  return (
    <ScrollView>
      <ViewContainer edges={['top']} padded gap='$4'>
        <H1>{t('entries.title')}</H1>
        <GardenSection />

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
