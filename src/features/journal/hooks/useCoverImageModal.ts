import { useCallback, useState } from 'react'

export function useCoverImageModal() {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleImagePress = useCallback((uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return {
    modalVisible,
    selectedImage,
    onImagePress: handleImagePress,
    onCloseModal: handleCloseModal,
  }
}
