import { Spinner, View } from 'tamagui'

import { EmptyJournal, JournalCard } from '@/components/features/journal'
import { Delay } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useDeleteJournal } from '@/hooks'
import { Journal, Maybe } from '@/types'

interface Props {
  firstRender: boolean
  journals: Maybe<Journal[]>
  isLoading: boolean
}

export const HomeJournalDisplay = ({
  firstRender,
  journals,
  isLoading,
}: Props) => {
  const { openDeleteSheet } = useDeleteJournal()

  if (isLoading) {
    return (
      <View height='$12' items='center' justify='center'>
        <Spinner size='large' />
      </View>
    )
  }

  return Array.isArray(journals) && journals.length > 0 ? (
    journals?.map((journal, index) => {
      const { id, content = '', createdAt, mood, imageUri = [] } = journal
      const delay = firstRender
        ? DelayMS.ANIMATION.MEDIUM[
            (index % DelayMS.ANIMATION.MEDIUM.length) +
              // @ts-ignore
              DelayMS.ANIMATION.MEDIUM[2]
          ]
        : DelayMS.ANIMATION.QUICK[0]
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
    <Delay delay={firstRender ? DelayMS.ANIMATION.MEDIUM[3] : undefined}>
      <EmptyJournal />
    </Delay>
  )
}
