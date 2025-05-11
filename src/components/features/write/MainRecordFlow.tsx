import { useEffect, useState } from 'react'
import { AnimatePresence, View, styled } from 'tamagui'

import { MoodPagination } from '@/components/features/mood'
import { PaginationDot } from '@/components/shared'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'
import { useStepProgress } from '@/store'
import { JournalDraft, Moods } from '@/types'
import { EnhancedTextInput } from './EnhancedTextInput'
import { MoodListPreview } from './MoodListPreview'

interface Props {
  moods: Moods
  onMoodIdChange: (moodId: string) => void
  draft: JournalDraft
  selectedMoodId: string
  onContentChange: (content: string) => void
  onImageUriChange: () => void
  onImageUriRemove: (imageUris: string[], index: number) => void
}

export function MainRecordFlow({
  moods,
  selectedMoodId,
  onMoodIdChange,
  draft,
  onContentChange,
  onImageUriChange,
  onImageUriRemove,
}: Props) {
  const {
    state: { currentStep },
  } = useStepProgress()
  const [[page, totalPage], setPage] = useState([0, 0])

  useEffect(() => {
    if (!moods) return

    const newTotalPage = Object.entries(moods).length || 0
    setPage(prev => [prev[0] < newTotalPage ? prev[0] : 0, newTotalPage])

    if (newTotalPage > 0 && !draft.moodId) {
      onMoodIdChange(moods?.[0]?.id)
    }
  }, [moods, onMoodIdChange])

  return (
    <AnimatePresence>
      {currentStep !== 2 && (
        <ZStackContainer>
          <MoodListPreview
            moods={moods}
            showDeleteButton={currentStep === 0}
            scrollEnabled={currentStep === 0}
            onMoodIdChange={onMoodIdChange}
            page={page}
            selectedMoodId={selectedMoodId}
            totalPage={totalPage}
            setPage={setPage}
          />
          <PaginationDot
            show={currentStep === 0}
            totalPage={totalPage}
            page={page}
          />
          <MoodPagination
            show={currentStep === 0}
            page={page}
            setPage={setPage}
            totalPage={totalPage}
          />
        </ZStackContainer>
      )}
      {currentStep === 2 && (
        <EnhancedTextInput
          show={currentStep === 2}
          imageUri={draft.imageUri}
          contentValue={draft.content}
          onContentChange={onContentChange}
          onImageUriRemove={onImageUriRemove}
          onImageUriChange={onImageUriChange}
        />
      )}
    </AnimatePresence>
  )
}

const ZStackContainer = styled(View, {
  flex: 1,
  items: 'center',
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
})
