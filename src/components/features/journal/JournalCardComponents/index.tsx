import { useRouter } from 'expo-router'
import { Fragment, useCallback, useState } from 'react'
import Animated from 'react-native-reanimated'
import { Card as TamaguiCard, styled } from 'tamagui'

import { FullScreenImageModal } from '@/components/features/modal/contents'
import { DelayMS, Layout, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants'
import { useCardGesture } from '@/hooks'
import { useBottomSheet } from '@/store'
import { BottomSheetType, ISOString, Maybe, Mood } from '@/types'
import { ActionButton } from './ActionButton'
import { CardContent } from './CardContent'
import { ImageSection } from './ImageSection'

interface Props {
  content: Maybe<string>
  journalId: number
  localDate: ISOString
  createdAt: string
  imageUri: Maybe<string[]>
  mood: Mood
}

export function JournalCard({
  content,
  journalId,
  localDate,
  createdAt,
  imageUri,
  mood,
}: Props) {
  const router = useRouter()
  const {
    gesture,
    GestureWrapper,
    animatedStyle,
    showActionButton,
    toggleState,
  } = useCardGesture()
  const [modalVisible, setModalVisible] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)

  const handleDeleteSheetOpen = useCallback(() => {
    showBottomSheet(BottomSheetType.DELETE_JOURNAL, Layout.SNAP_POINTS.DELETE, {
      journalId,
      localDate,
      hideBottomSheet,
    })
  }, [showBottomSheet, hideBottomSheet, journalId, localDate])

  const handlePress = useCallback(() => {
    if (showActionButton) {
      toggleState()
    } else {
      setIsPressed(true)
      setTimeout(() => {
        setTimeout(() => setIsPressed(false), 0)
        router.push({
          pathname: '/journal/[journalId]',
          params: { journalId: journalId, isNewJournal: 'false' },
        })
      }, DelayMS.ROUTE)
    }
  }, [showActionButton, toggleState, router, journalId, localDate])

  const handleImageLongPress = useCallback(() => {
    if (imageUri && imageUri.length > 0) {
      setModalVisible(true)
    }
  }, [imageUri])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <Fragment>
      <ActionButton
        showActionButton={showActionButton}
        onPress={handleDeleteSheetOpen}
      />

      <GestureWrapper gesture={gesture}>
        <AnimatedCard onPress={handlePress} style={animatedStyle}>
          <CardContent
            content={content}
            createdAt={createdAt}
            mood={mood}
            showActionButton={showActionButton}
            toggleState={toggleState}
          />

          <ImageSection
            imageUri={imageUri}
            showActionButton={showActionButton}
            isPressed={isPressed}
            onImageLongPress={handleImageLongPress}
          />
        </AnimatedCard>
      </GestureWrapper>

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={imageUri?.[0]}
        onClose={handleCloseModal}
      />
    </Fragment>
  )
}
const Card = styled(TamaguiCard, {
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

const AnimatedCard = Animated.createAnimatedComponent(Card)
