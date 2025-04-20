import { ChevronLeft, ChevronRight, Trash } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { Fragment, memo, useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { AnimatePresence } from 'tamagui'

import { moodTheme } from '@/constants'
import { useAxisAnimationWithState } from '@/hooks/useAxisAnimationWithState'
import { useCardGesture } from '@/hooks/useCardGesture'
import { Position } from '@/types'
import type { MoodLevel, MoodType } from '@/types'

import { FullScreenImageModal } from '@/components/modals/contents/FullScreenImageModal'
import { PressableButton } from '@/components/shared/PressableButton'
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
          <AnimatePresence>
            {cardPosition === Position.LEFT && (
              <S.ActionBox>
                <S.DeleteButton
                  icon={Trash}
                  onPress={() => openDeleteSheet(id)}
                />
              </S.ActionBox>
            )}
          </AnimatePresence>

          <GestureWrapper gesture={gesture}>
            <AnimatedCard onPress={handlePress} style={animatedStyle}>
              <S.CardHeader>
                <S.Content>
                  <S.MoodBar moodColor={moodColor} />
                  <S.JournalContentBox>
                    <S.TimeText createdAt={createdAt} />
                    <S.JournalContentText>{content}</S.JournalContentText>
                  </S.JournalContentBox>
                  <PressableButton
                    icon={
                      cardPosition === Position.CENTER
                        ? ChevronRight
                        : ChevronLeft
                    }
                    onPress={() => toggleState()}
                  />
                </S.Content>
              </S.CardHeader>

              {Array.isArray(imageUri) && imageUri.length > 0 && (
                <S.CardBackground>
                  <TouchableOpacity
                    onLongPress={handleImageLongPress}
                    delayLongPress={300}
                  >
                    <S.JournalCoverImage source={{ uri: imageUri[0] }} />
                  </TouchableOpacity>

                  <AnimatePresence>
                    {isOpenCard || isPressed ? null : <S.ImageCoverGradient />}
                  </AnimatePresence>
                </S.CardBackground>
              )}
            </AnimatedCard>
          </GestureWrapper>
        </S.Container>

        {imageUri && imageUri.length > 0 && (
          <FullScreenImageModal
            visible={modalVisible}
            imageUri={imageUri[0]}
            onClose={handleCloseModal}
          />
        )}
      </Fragment>
    )
  },
)
