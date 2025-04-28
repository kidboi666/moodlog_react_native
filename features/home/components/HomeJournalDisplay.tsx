import { Delay } from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useJournal, useMood } from '@/shared/store'

import { EmptyJournal, JournalCard } from '@/features/journal/components'
import { useDeleteJournal } from '@/features/journal/hooks'

export const HomeJournalDisplay = () => {
  const selectedJournals = useJournal(state => state.selectedJournals)
  const moods = useMood(state => state.moods)
  const { openDeleteSheet } = useDeleteJournal()

  return Array.isArray(selectedJournals) ? (
    selectedJournals.map((journal, index) => {
      const { id, content, createdAt, mood, imageUri } = journal
      return (
        <Delay
          key={journal.id}
          delay={
            DelayMS.ANIMATION.MEDIUM[
              (index % DelayMS.ANIMATION.MEDIUM.length) +
                DelayMS.ANIMATION.MEDIUM[3]
            ]
          }
        >
          <JournalCard
            journalId={id}
            content={content}
            mood={mood}
            moods={moods}
            imageUri={imageUri}
            createdAt={createdAt}
            openDeleteSheet={openDeleteSheet}
          />
        </Delay>
      )
    })
  ) : (
    <Delay delay={DelayMS.ANIMATION.MEDIUM[3]}>
      <EmptyJournal />
    </Delay>
  )
}
