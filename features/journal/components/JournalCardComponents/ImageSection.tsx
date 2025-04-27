import { TouchableOpacity } from 'react-native'
import { AnimatePresence, Card, Image, styled } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

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
    <CardBackground>
      <TouchableOpacity onLongPress={onImageLongPress} delayLongPress={300}>
        <JournalCoverImage source={{ uri: imageUri[0] }} />
      </TouchableOpacity>

      <AnimatePresence>
        {isOpenCard || isPressed ? null : <ImageCoverGradient />}
      </AnimatePresence>
    </CardBackground>
  )
}

const CardBackground = styled(Card.Background, {
  rounded: '$8',
})

const JournalCoverImage = styled(Image, {
  animation: 'medium',
  opacity: 0.6,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
})

const ImageCoverGradient = styled(LinearGradient, {
  animation: 'quick',
  animateOnly: ['opacity'],
  opacity: 1,
  exitStyle: { opacity: 0 },
  width: '100%',
  height: '100%',
  colors: ['$gray5', 'rgba(0,0,0,0)'],
  start: [0, 0],
  end: [2.4, 0],
  position: 'absolute',
  pointerEvents: 'none',
})
