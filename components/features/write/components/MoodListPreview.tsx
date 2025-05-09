import { Trash } from '@tamagui/lucide-icons'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { FlatList, useWindowDimensions } from 'react-native'
import { Button, View, styled } from 'tamagui'

import { MoodPreviewItem } from '@/components/features/mood/components'
import { useDeleteMood } from '@/components/features/mood/hooks'
import { Layout, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants'
import { Moods } from '@/types'

interface Props {
  moods: Moods
  page: number
  selectedMoodId: string
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  scrollEnabled: boolean
  onMoodIdChange: (moodId: string) => void
}

export const MoodListPreview = ({
  moods,
  page,
  selectedMoodId,
  setPage,
  totalPage,
  scrollEnabled,
  onMoodIdChange,
}: Props) => {
  const { width } = useWindowDimensions()
  const { openDeleteSheet } = useDeleteMood()
  const flatListRef = useRef<FlatList<any>>(null)

  useEffect(() => {
    if (flatListRef.current && Object.values(moods).length > 0) {
      const maxIndex = Object.values(moods).length - 1
      const safeIndex = Math.min(Math.max(page, 0), maxIndex)
      flatListRef.current.scrollToIndex({
        index: safeIndex,
        animated: true,
      })
    }
  }, [page, moods])

  return (
    <Container>
      <Button
        self='flex-end'
        position='absolute'
        animation='quick'
        pressStyle={PRESS_STYLE}
        animateOnly={PRESS_STYLE_KEY}
        r={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
        color='$color11'
        scaleIcon={1.5}
        icon={Trash}
        z={100_000}
        onPress={() => openDeleteSheet(selectedMoodId)}
      />

      <FlatList
        ref={flatListRef}
        scrollEnabled={scrollEnabled}
        data={Object.values(moods)}
        renderItem={({ item }) => (
          <MoodPreviewItem width={width} name={item.name} color={item.color} />
        )}
        onScrollToIndexFailed={info => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            })
          }, 100)
        }}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        snapToInterval={width}
        keyExtractor={item => item.id}
        onViewableItemsChanged={({ viewableItems }) => {
          onMoodIdChange(viewableItems[0]?.item?.id || '')
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const page = Math.round(nativeEvent.contentOffset.x / width)
          setPage([page, totalPage])
        }}
        pagingEnabled
        decelerationRate='fast'
        horizontal
      />
    </Container>
  )
}

const Container = styled(View, {
  flex: 1,
})
