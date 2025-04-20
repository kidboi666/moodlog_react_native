import { FullScreenImageModal } from '@/components/modals/contents/FullScreenImageModal'

interface ModalSectionProps {
  imageUri: string[]
  modalVisible: boolean
  onCloseModal: () => void
}

export const ModalSection = ({
  imageUri,
  modalVisible,
  onCloseModal
}: ModalSectionProps) => {
  if (!imageUri || imageUri.length === 0) {
    return null
  }

  return (
    <FullScreenImageModal
      visible={modalVisible}
      imageUri={imageUri[0]}
      onClose={onCloseModal}
    />
  )
}
