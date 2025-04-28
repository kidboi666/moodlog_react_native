import { Dispatch, SetStateAction } from 'react'
import { View, styled } from 'tamagui'

import { MoodLevelForm, MoodPagination } from '@/features/mood/components'
import { Layout } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'
import { Draft, MoodLevel, Moods } from '@/shared/types'
import { MoodJournalForm } from './MoodJournalForm'

interface Props {
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  moods: Moods
  draft: Draft
  moodLevel: MoodLevel
  setMoodLevel: Dispatch<SetStateAction<MoodLevel>>
  selectedMoodId: string
  onImageUriRemove: (imageUri: string[], index: number) => void
  onContentChange: (content: string) => void
  onImageUriChange: () => void
}

export const BottomUiFlow = ({
  page,
  setPage,
  totalPage,
  moods,
  draft,
  moodLevel,
  setMoodLevel,
  selectedMoodId,
  onImageUriRemove,
  onContentChange,
  onImageUriChange,
}: Props) => {
  const {
    state: { currentStep },
  } = useStepProgress()
  return (
    <Container>
      <MoodPagination
        show={currentStep === 0}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
      />
      <MoodLevelForm
        show={!!(currentStep === 1 && selectedMoodId && moods[selectedMoodId])}
        moodColor={moods[selectedMoodId]?.color}
        moodLevel={moodLevel}
        setMoodLevel={setMoodLevel}
      />
      <MoodJournalForm
        show={currentStep === 2}
        onImageUriRemove={onImageUriRemove}
        onContentChange={onContentChange}
        onImageUriChange={onImageUriChange}
        draft={draft}
      />
    </Container>
  )
}

const Container = styled(View, {
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  height: Layout.HEIGHT.WRITE_PROGRESS_BAR_HEIGHT,
  flex: 1,
})
