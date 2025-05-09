import { useQuery } from '@tanstack/react-query'

import {
  EmptyJournal,
  JournalCard,
} from '@/components/features/journal/components'
import { useDeleteJournal } from '@/components/features/journal/hooks'
import { Delay } from '@/components/shared'
import { DelayMS } from '@/constants'
import { JournalQueries } from '@/queries'
import { ISODateString, Maybe } from '@/types'

interface Props {
  selectedDate: Maybe<ISODateString>
}

export const HomeJournalDisplay = ({ selectedDate }: Props) => {
  const { openDeleteSheet } = useDeleteJournal()
  const { data: journals } = useQuery(
    JournalQueries.getJournals('daily', selectedDate),
  )

  return Array.isArray(journals) ? (
    journals.map((journal, index) => {
      const { id, content = '', createdAt, mood, imageUri = [] } = journal
      const delay =
        DelayMS.ANIMATION.MEDIUM[
          (index % DelayMS.ANIMATION.MEDIUM.length) +
            // @ts-ignore
            DelayMS.ANIMATION.MEDIUM[2]
        ]
      return (
        <Delay key={journal.id} delay={delay}>
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
    <Delay delay={DelayMS.ANIMATION.MEDIUM[3]}>
      <EmptyJournal />
    </Delay>
  )
}
