import { Dispatch, SetStateAction } from 'react'
import { AnimatePresence, View, styled } from 'tamagui'

import { MoodPagination } from '@/features/mood/components'
import { PaginationDot } from '@/shared/components'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'
import { Draft } from '@/shared/types'
import { EnhancedTextInput } from './EnhancedTextInput'
import { MoodListPreview } from './MoodListPreview'

interface Props {
  page: number
  totalPage: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  moods: Record<string, any>
  setSelectedMoodId: (moodId: string) => void
  draft: Draft
  selectedMoodId: string
  onContentChange: (content: string) => void
  onImageUriChange: () => void
  onImageUriRemove: (imageUris: string[], index: number) => void
}

export const MainRecordFlow = ({
  page,
  totalPage,
  setPage,
  moods,
  selectedMoodId,
  setSelectedMoodId,
  draft,
  onContentChange,
  onImageUriChange,
  onImageUriRemove,
}: Props) => {
  const {
    state: { currentStep },
  } = useStepProgress()

  return (
    <AnimatePresence>
      {currentStep !== 2 && (
        <ZStackContainer>
          <MoodListPreview
            moods={moods}
            scrollEnabled={currentStep === 0}
            setSelectedMoodId={setSelectedMoodId}
            page={page}
            selectedModdId={selectedMoodId}
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
