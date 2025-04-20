import { ANIMATION_DELAY_MS } from '@/constants'
import type { ISODateString, Nullable, SelectedJournals } from '@/types'

import { EmptyJournal, JournalCard } from '@/components/features/journal'
import { AnimateMount } from '@/components/shared'

interface Props {
  journals: SelectedJournals
  openDeleteSheet: (id: string) => void
  isToday: (date: Nullable<ISODateString>) => boolean
}

export const HomeJournalCard = ({
  journals,
  openDeleteSheet,
  isToday,
}: Props) => {
  return Array.isArray(journals) ? (
    journals.map((journal, index) => {
      const { id, content, createdAt, mood, imageUri } = journal
      return (
        <AnimateMount
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
            moodColor={mood.color}
            imageUri={imageUri}
            createdAt={createdAt}
            openDeleteSheet={openDeleteSheet}
          />
        </AnimateMount>
      )
    })
  ) : (
    <AnimateMount delay={ANIMATION_DELAY_MS[3]}>
      <EmptyJournal isToday={isToday(journals)} />
    </AnimateMount>
  )
}
