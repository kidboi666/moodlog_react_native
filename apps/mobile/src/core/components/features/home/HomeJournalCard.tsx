import { Fragment } from 'react'

import { EmptyJournal } from '@/core/components/features/journal/EmptyJournal'
import { JournalCard } from '@/core/components/features/journal/JournalCard'
import { FadeIn } from '@/core/components/shared/FadeIn.styleable'
import {
  ANIMATION_DELAY_MS,
  ANIMATION_DELAY_SECONDS,
} from '@/core/constants/time'
import type { ISODateString } from '@/types/date.types'
import type { SelectedJournals } from '@/types/journal.types'
import type { Nullable } from '@/types/utill.types'

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
        <Fragment key={journal.id}>
          <FadeIn
            delay={ANIMATION_DELAY_MS[index % ANIMATION_DELAY_SECONDS.length]}
          >
            <JournalCard
              id={id}
              content={content}
              moodType={mood.type}
              moodLevel={mood.level}
              imageUri={imageUri}
              createdAt={createdAt}
              openDeleteSheet={openDeleteSheet}
            />
          </FadeIn>
        </Fragment>
      )
    })
  ) : (
    <FadeIn>
      <EmptyJournal isToday={isToday(journals)} />
    </FadeIn>
  )
}
