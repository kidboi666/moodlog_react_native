import { useDraft } from '@/src/data/store'
import { EnhancedTextInput } from '@/src/features/write'
import { ScreenView } from '@/src/shared/components'

export default function WriteJournalScreen() {
  const {
    draft,
    onContentChange,
    onAddImage,
    onAiResponseChange,
    onRemoveImage,
  } = useDraft()

  return (
    <ScreenView>
      <EnhancedTextInput
        imageUri={draft.imageUri}
        contentValue={draft.content}
        aiResponseEnabled={draft.aiResponseEnabled}
        onContentChange={onContentChange}
        onImageUriRemove={onRemoveImage}
        onImageUriChange={onAddImage}
        onAiResponseChange={onAiResponseChange}
      />
    </ScreenView>
  )
}
