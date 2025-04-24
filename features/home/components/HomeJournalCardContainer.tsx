import { useJournal } from '@/store'
import { ANIMATION_DELAY_MS } from 'shared/constants'
import { useCalendar } from 'shared/hooks'

import { EmptyJournal, JournalCard } from '@/features/journal/components'
import { useDeleteJournal } from '@/features/journal/hooks/useDeleteJournal'
import { AnimatedEntry } from '@/shared/components'

export const HomeJournalCardContainer = () => {
  const { isToday, selectedDate } = useCalendar()
  const { openDeleteSheet } = useDeleteJournal(selectedDate)
  const selectedJournals = useJournal(state => state.selectedJournals)

  return Array.isArray(selectedJournals) ? (
    selectedJournals.map((journal, index) => {
      const { id, content, createdAt, mood, imageUri } = journal
      return (
        <AnimatedEntry
          key={journal.id}
          delay={
            ANIMATION_DELAY_MS[
              (index % ANIMATION_DELAY_MS.length) + ANIMATION_DELAY_MS[3]
            ]
          }
        >
          <JournalCard
            id={id}
            content={content}
            mood={mood}
            imageUri={imageUri}
            createdAt={createdAt}
            openDeleteSheet={openDeleteSheet}
          />
        </AnimatedEntry>
      )
    })
  ) : (
    <AnimatedEntry delay={ANIMATION_DELAY_MS[3]}>
      <EmptyJournal isToday={isToday(selectedJournals)} />
    </AnimatedEntry>
  )
}
