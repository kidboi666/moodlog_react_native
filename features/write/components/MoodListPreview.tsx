import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from 'react'
import { FlatList, useWindowDimensions } from 'react-native'

import { MoodPreviewItem } from '@/features/mood/components'
import { Layout } from '@/shared/constants'
import { Moods } from '@/shared/types'
import { Trash } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

interface Props {
  moods: Moods
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  scrollEnabled: boolean
  setSelectedMoodId: (moodId: string) => void
}

export const MoodListPreview = ({
  moods,
  page,
  setPage,
  totalPage,
  scrollEnabled,
  setSelectedMoodId,
}: Props) => {
  const { width } = useWindowDimensions()
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
    <Fragment>
      <Button
        self='flex-end'
        mr={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
        color='$color11'
        scaleIcon={1.5}
        icon={Trash}
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
          setSelectedMoodId(viewableItems[0]?.item?.id || '')
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const page = Math.round(nativeEvent.contentOffset.x / width)
          setPage([page, totalPage])
        }}
        pagingEnabled
        decelerationRate='fast'
        horizontal
      />
    </Fragment>
  )
}
