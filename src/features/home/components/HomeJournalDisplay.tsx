import { ActivityIndicator } from 'react-native-paper'

import { EmptyJournal, JournalCard } from '@/src/features/journal'
import { Delay } from '@/src/shared/components'
import { Journal, Maybe } from '@/src/shared/types'

interface Props {
  delay?: number
  journals: Maybe<Journal[]>
  isLoading: boolean
}

export function HomeJournalDisplay({ delay, journals, isLoading }: Props) {
  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  return Array.isArray(journals) && journals.length > 0 ? (
    journals?.map(journal => {
      const {
        id,
        content = '',
        createdAt,
        moodName,
        imageUri = [],
        localDate,
      } = journal
      return (
        <JournalCard
          key={journal.id}
          delay={delay}
          journalId={id}
          content={content}
          moodName={moodName}
          imageUri={imageUri}
          createdAt={createdAt}
          localDate={localDate}
        />
      )
    })
  ) : (
    <Delay delay={delay}>
      <EmptyJournal source='home' />
    </Delay>
  )
}
