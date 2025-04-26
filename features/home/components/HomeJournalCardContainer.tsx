import { Delay } from '@/shared/components'
import { ANIMATION_DELAY_MS } from '@/shared/constants'
import { useJournal } from '@/shared/store'

import { EmptyJournal, JournalCard } from '@/features/journal/components'
import { useDeleteJournal } from '@/features/journal/hooks'

export const HomeJournalCardContainer = () => {
  const selectedJournals = useJournal(state => state.selectedJournals)
  const { openDeleteSheet } = useDeleteJournal()

  return Array.isArray(selectedJournals) ? (
    selectedJournals.map((journal, index) => {
      const { id, content, createdAt, mood, imageUri } = journal
      return (
        <Delay
          key={journal.id}
          delay={
            ANIMATION_DELAY_MS[
              (index % ANIMATION_DELAY_MS.length) + ANIMATION_DELAY_MS[3]
            ]
          }
        >
          <JournalCard
            journalId={id}
            content={content}
            mood={mood}
            imageUri={imageUri}
            createdAt={createdAt}
            openDeleteSheet={openDeleteSheet}
          />
        </Delay>
      )
    })
  ) : (
    <Delay delay={ANIMATION_DELAY_MS[3]}>
      <EmptyJournal />
    </Delay>
  )
}
