import { useRouter } from 'expo-router'
import { Fragment, memo, useCallback, useState } from 'react'
import Animated from 'react-native-reanimated'

import { useAxisAnimationWithState, useCardGesture } from 'shared/hooks'
import { JournalMood, Position } from 'shared/types'

import { ActionButton } from '@/features/journal/components/JournalCardComponents/ActionButton'
import { CardContent } from '@/features/journal/components/JournalCardComponents/CardContent'
import { ImageSection } from '@/features/journal/components/JournalCardComponents/ImageSection'
import { FullScreenImageModal } from 'features/modal/components/contents'
import { MOUNT_STYLE, PRESS_STYLE, PRESS_STYLE_KEY } from 'shared/constants'
import { Card, View, styled } from 'tamagui'

const CardContainer = styled(Card, {
  group: true,
  animation: 'medium',
  pressStyle: PRESS_STYLE,
  animateOnly: PRESS_STYLE_KEY,
  flex: 1,
  position: 'relative',
  width: '100%',
  bg: '$backgroundHover',
  rounded: '$8',
})

const Container = styled(View, {
  animation: 'quick',
  enterStyle: MOUNT_STYLE,
})

const AnimatedCard = Animated.createAnimatedComponent(CardContainer)

interface Props {
  content: string
  id: string
  createdAt: string
  imageUri: string[]
  mood: JournalMood
  openDeleteSheet: (id: string) => void
}

export const JournalCard = memo(
  ({ content, id, createdAt, imageUri, mood, openDeleteSheet }: Props) => {
    const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false)
    const {
      state: cardPosition,
      animatedStyle,
      toggleState,
      changeStateByCondition,
      updateTranslate,
      handleGestureEnd,
    } = useAxisAnimationWithState('x', {
      defaultState: Position.CENTER,
      nextState: Position.LEFT,
      startValue: 0,
      endValue: -80,
      duration: 300,
    })
    const [isPressed, setIsPressed] = useState(false)

    const isOpenCard = cardPosition === Position.LEFT

    const handleSwipeLeft = useCallback(() => {
      if (cardPosition === Position.CENTER) {
        changeStateByCondition(true)
      }
    }, [cardPosition, toggleState])

    const handleSwipeRight = useCallback(() => {
      if (cardPosition === Position.LEFT) {
        changeStateByCondition(false)
      }
    }, [cardPosition, toggleState])

    const { gesture, GestureWrapper } = useCardGesture({
      onSwipeLeft: handleSwipeLeft,
      onSwipeRight: handleSwipeRight,
      onLongPress: () =>
        changeStateByCondition(cardPosition === Position.CENTER),
      updateTranslate,
      onGestureEnd: handleGestureEnd,
    })

    const handlePress = () => {
      if (isOpenCard) {
        toggleState()
      } else {
        setIsPressed(true)
        setTimeout(() => {
          setTimeout(() => setIsPressed(false), 0)
          router.push({
            pathname: '/journal/[id]',
            params: { id },
          })
        }, 300)
      }
    }

    const handleImageLongPress = () => {
      if (imageUri && imageUri.length > 0) {
        setModalVisible(true)
      }
    }

    const handleCloseModal = () => {
      setModalVisible(false)
    }

    return (
      <Fragment>
        <Container>
          <ActionButton
            cardPosition={cardPosition}
            openDeleteSheet={openDeleteSheet}
            id={id}
          />

          <GestureWrapper gesture={gesture}>
            <AnimatedCard onPress={handlePress} style={animatedStyle}>
              <CardContent
                content={content}
                createdAt={createdAt}
                mood={mood}
                cardPosition={cardPosition}
                toggleState={toggleState}
              />

              <ImageSection
                imageUri={imageUri}
                isOpenCard={isOpenCard}
                isPressed={isPressed}
                onImageLongPress={handleImageLongPress}
              />
            </AnimatedCard>
          </GestureWrapper>
        </Container>

        <FullScreenImageModal
          visible={modalVisible}
          imageUri={imageUri[0]}
          onClose={handleCloseModal}
        />
      </Fragment>
    )
  },
)
