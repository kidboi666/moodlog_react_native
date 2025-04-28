import { MoodPreviewItem } from '@/features/mood/components'
import { Moods } from '@/shared/types'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { FlatList, useWindowDimensions } from 'react-native'

interface Props {
  show: boolean
  moods: Moods
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  scrollEnabled: boolean
  setSelectedMoodId: (moodId: string) => void
}

export const MoodListPreview = ({
  show,
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
    if (!show) {
      return
    }

    if (flatListRef.current && Object.values(moods).length > 0) {
      flatListRef.current.scrollToIndex({
        index: page,
        animated: true,
      })
    }
  }, [page])

  if (!show) {
    return null
  }

  return (
    <FlatList
      ref={flatListRef}
      scrollEnabled={scrollEnabled}
      data={Object.values(moods)}
      renderItem={({ item }) => (
        <MoodPreviewItem width={width} name={item.name} color={item.color} />
      )}
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
  )
}
