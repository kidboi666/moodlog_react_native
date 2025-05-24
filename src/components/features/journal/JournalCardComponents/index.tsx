import { useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, IconButton, useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'

import { FullScreenImageModal } from '@/components/features/modal/contents'
import { DelayMS, Layout } from '@/constants'
import { useCardGesture } from '@/hooks'
import { useBottomSheet } from '@/store'
import { BottomSheetType, ISOString, Maybe, Mood } from '@/types'
import { ActionButton } from './ActionButton'

const AnimatedCard = Animated.createAnimatedComponent(Card)

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
  const theme = useTheme()
  const router = useRouter()
  const {
    gesture,
    GestureWrapper,
    animatedStyle,
    showActionButton,
    toggleState,
  } = useCardGesture()
  const [modalVisible, setModalVisible] = useState(false)
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
      setTimeout(() => {
        router.push({
          pathname: '/(journal)/[journalId]',
          params: { journalId: journalId, isNewJournal: 'false' },
        })
      }, DelayMS.ROUTE)
    }
  }, [showActionButton, toggleState, router, journalId, localDate])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const memoizedStyles = useMemo(
    () => ({
      moodBar: {
        backgroundColor: mood?.color,
      },
    }),
    [mood?.color],
  )

  return (
    <View style={styles.container}>
      <ActionButton
        showActionButton={showActionButton}
        onPress={handleDeleteSheetOpen}
      />

      <GestureWrapper gesture={gesture}>
        <AnimatedCard
          onPress={handlePress}
          style={[styles.card, animatedStyle]}
        >
          <Card.Title
            title={createdAt}
            subtitle={content}
            subtitleNumberOfLines={4}
            left={() => (
              <View style={[memoizedStyles.moodBar, styles.moodBar]} />
            )}
            right={() => (
              <IconButton
                mode='contained'
                icon={showActionButton ? 'chevron-right' : 'chevron-left'}
                onPress={() => toggleState()}
              />
            )}
          />
          {imageUri?.[0] && (
            <Card.Cover source={{ uri: imageUri?.[0] }} style={styles.image} />
          )}
        </AnimatedCard>
      </GestureWrapper>

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={imageUri?.[0]}
        onClose={handleCloseModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  moodBar: {
    width: 8,
    height: '75%',
    borderRadius: 8,
  },
  contentBox: {
    flex: 1,
    gap: 4,
  },
  image: {
    marginTop: 20,
  },
})
