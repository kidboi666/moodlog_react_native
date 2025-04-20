import { useRouter } from 'expo-router'
import { Fragment, memo, useCallback, useState } from 'react'
import Animated from 'react-native-reanimated'

import { useAxisAnimationWithState, useCardGesture } from '@/hooks'
import { Position } from '@/types'

import { ActionButton } from '@/components/features/journal/JournalCardComponents/ActionButton'
import { CardContent } from '@/components/features/journal/JournalCardComponents/CardContent'
import { ImageSection } from '@/components/features/journal/JournalCardComponents/ImageSection'
import { ModalSection } from '@/components/features/journal/JournalCardComponents/ModalSection'
import * as S from './JournalCard.styled'

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer)

interface Props {
  content: string
  id: string
  createdAt: string
  imageUri: string[]
  moodColor?: string
  openDeleteSheet: (id: string) => void
}

export const JournalCard = memo(
  ({ content, id, createdAt, imageUri, moodColor, openDeleteSheet }: Props) => {
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
        <S.Container>
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
                moodColor={moodColor}
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
        </S.Container>

        <ModalSection
          imageUri={imageUri}
          modalVisible={modalVisible}
          onCloseModal={handleCloseModal}
        />
      </Fragment>
    )
  },
)
