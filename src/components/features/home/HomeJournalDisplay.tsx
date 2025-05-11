import { Spinner, View } from 'tamagui'

import { EmptyJournal, JournalCard } from '@/components/features/journal'
import { Delay } from '@/components/shared'
import { DelayMS } from '@/constants'
import { Journal, Maybe } from '@/types'

interface Props {
  firstRender: boolean
  journals: Maybe<Journal[]>
  isLoading: boolean
}

export function HomeJournalDisplay({
  firstRender,
  journals,
  isLoading,
}: Props) {
  const delay = firstRender ? DelayMS.ANIMATION.MEDIUM[3] : undefined
  if (isLoading) {
    return (
      <View height='$12' items='center' justify='center'>
        <Spinner size='large' />
      </View>
    )
  }

  return Array.isArray(journals) && journals.length > 0 ? (
    journals?.map(journal => {
      const {
        id,
        content = '',
        createdAt,
        mood,
        imageUri = [],
        localDate,
      } = journal
      return (
        <Delay key={journal.id} delay={delay}>
          <JournalCard
            journalId={id}
            content={content}
            mood={mood}
            imageUri={imageUri}
            createdAt={createdAt}
            localDate={localDate}
          />
        </Delay>
      )
    })
  ) : (
    <Delay delay={delay}>
      <EmptyJournal />
    </Delay>
  )
}
