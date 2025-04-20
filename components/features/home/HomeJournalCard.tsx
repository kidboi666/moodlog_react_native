import { ANIMATION_DELAY_MS, ANIMATION_DELAY_SECONDS } from '@/constants'
import type { ISODateString, Nullable, SelectedJournals } from '@/types'

import { EmptyJournal } from '@/components/features/journal/EmptyJournal'
import { JournalCard } from '@/components/features/journal/JournalCard'
import { FadeIn } from '@/components/shared/FadeIn.styleable'

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
        <FadeIn
          key={journal.id}
          delay={ANIMATION_DELAY_MS[index % ANIMATION_DELAY_SECONDS.length]}
        >
          <JournalCard
            id={id}
            content={content}
            moodColor={mood.color}
            imageUri={imageUri}
            createdAt={createdAt}
            openDeleteSheet={openDeleteSheet}
          />
        </FadeIn>
      )
    })
  ) : (
    <FadeIn>
      <EmptyJournal isToday={isToday(journals)} />
    </FadeIn>
  )
}
