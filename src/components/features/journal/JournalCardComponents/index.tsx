import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, IconButton, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { FullScreenImageModal } from '@/components/shared'
import { Colors, DelayMS, Layout } from '@/constants'
import { useCardGesture } from '@/hooks'
import { useBottomSheet } from '@/store'
import { BottomSheetType, ISOString, Maybe, MoodName } from '@/types'
import { ActionButton } from './ActionButton'

const AnimatedCard = Animated.createAnimatedComponent(Card)

interface Props {
  content: Maybe<string>
  journalId: number
  localDate: ISOString
  createdAt: string
  imageUri: Maybe<string[]>
  moodName: string
  delay?: number
}

export function JournalCard({
  content,
  journalId,
  localDate,
  createdAt,
  imageUri,
  moodName,
  delay,
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

  return (
    <Animated.View
      entering={FadeIn.delay(delay || 0).duration(DelayMS.ANIMATION.LONG)}
      style={styles.container}
    >
      <ActionButton
        showActionButton={showActionButton}
        onPress={handleDeleteSheetOpen}
      />
      <GestureWrapper gesture={gesture}>
        <AnimatedCard
          onPress={handlePress}
          style={[styles.card, animatedStyle]}
        >
          <View style={styles.inner}>
            <Card.Title
              title={createdAt.split(' ')[1].substring(0, 5)}
              titleStyle={[styles.title, { color: theme.colors.onSurface }]}
              subtitle={content}
              subtitleNumberOfLines={4}
              left={() => (
                <View
                  style={[
                    styles.moodBar,
                    { backgroundColor: Colors.mood[moodName as MoodName] },
                  ]}
                />
              )}
              right={() => (
                <IconButton
                  icon={showActionButton ? 'chevron-right' : 'chevron-left'}
                  onPress={() => toggleState()}
                />
              )}
            />
          </View>
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
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  inner: {
    padding: 8,
  },
  moodBar: {
    width: 8,
    height: '100%',
    borderRadius: 8,
  },
  contentBox: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 0,
  },
})
