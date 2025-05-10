import { Spinner, View } from 'tamagui'

import { EmptyJournal, JournalCard } from '@/components/features/journal'
import { Delay } from '@/components/shared'
import { DelayMS, Layout } from '@/constants'
import { useBottomSheet } from '@/store'
import { BottomSheetType, Journal, Maybe } from '@/types'

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
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)

  const handleDeleteSheetOpen = (journalId: string) => {
    showBottomSheet(BottomSheetType.DELETE_JOURNAL, Layout.SNAP_POINTS.DELETE, {
      journalId,
      hideBottomSheet,
    })
  }

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
            openDeleteSheet={handleDeleteSheetOpen}
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
