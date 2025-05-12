import { memo } from 'react'
import { YStack } from 'tamagui'

import { DateHeader } from '@/components/features/entries/DateHeader'
import { JournalCard } from '@/components/features/journal'
import type { ISOMonthString, Journal } from '@/types'

interface Props {
  journals: Journal[]
  date: string
  selectedMonth: ISOMonthString
}

function _EntriesJournalDisplay({ journals, date, selectedMonth }: Props) {
  return (
    <YStack key={date} gap='$4'>
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
            localDate={selectedMonth}
          />
        )
      })}
    </YStack>
  )
}

export const EntriesJournalDisplay = memo(_EntriesJournalDisplay)
EntriesJournalDisplay.displayName = 'EntriesJournalDisplay'
