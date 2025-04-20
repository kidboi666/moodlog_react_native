import { TouchableOpacity } from 'react-native'
import { AnimatePresence } from 'tamagui'

import { Position } from '@/types'
import * as S from './JournalCard.styled'

interface ImageSectionProps {
  imageUri: string[]
  isOpenCard: boolean
  isPressed: boolean
  onImageLongPress: () => void
}

export const ImageSection = ({
  imageUri,
  isOpenCard,
  isPressed,
  onImageLongPress,
}: ImageSectionProps) => {
  if (!Array.isArray(imageUri) || imageUri.length === 0) {
    return null
  }

  return (
    <S.CardBackground>
      <TouchableOpacity onLongPress={onImageLongPress} delayLongPress={300}>
        <S.JournalCoverImage source={{ uri: imageUri[0] }} />
      </TouchableOpacity>

      <AnimatePresence>
        {isOpenCard || isPressed ? null : <S.ImageCoverGradient />}
      </AnimatePresence>
    </S.CardBackground>
  )
}
