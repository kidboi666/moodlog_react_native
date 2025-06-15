import { EnhancedTextInput } from '@/components/features/write'
import { ScreenView } from '@/components/shared'
import { useDraft } from '@/store'

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
