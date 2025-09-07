import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

import { DateHeader } from '@/src/components/features/entries/DateHeader'
import { JournalCard } from '@/src/components/features/journal'
import type { ISOMonthString, Journal } from '@/src/types'

interface Props {
  journals: Journal[]
  date: string
  selectedMonth: ISOMonthString
}

function _EntriesJournalDisplay({ journals, date, selectedMonth }: Props) {
  return (
    <View key={date} style={styles.container}>
      <DateHeader date={date} />
      {journals.map(journal => {
        const { content, imageUri, id, createdAt, moodName } = journal
        return (
          <JournalCard
            key={id}
            journalId={id}
            content={content}
            imageUri={imageUri}
            createdAt={createdAt}
            moodName={moodName}
            localDate={selectedMonth}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
})

export const EntriesJournalDisplay = memo(_EntriesJournalDisplay)
EntriesJournalDisplay.displayName = 'EntriesJournalDisplay'
