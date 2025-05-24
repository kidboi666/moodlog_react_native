import { Dispatch, SetStateAction, useCallback } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { IconButton } from '@/components/shared'
import { Layout } from '@/constants'

const { height } = Dimensions.get('window')

interface Props {
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  show: boolean
}

export function MoodPagination({ page, setPage, totalPage, show }: Props) {
  const handleLeftPress = useCallback(() => {
    setPage(([page, totalPage]) => [
      (page + totalPage - 1) % totalPage,
      totalPage,
    ])
  }, [])

  const handleRightPress = useCallback(() => {
    setPage(([page, totalPage]) => [(page + 1) % totalPage, totalPage])
  }, [])

  if (!show) return null

  return (
    <View style={styles.container}>
      <IconButton
        icon='chevron-left'
        onPress={handleLeftPress}
        disabled={page === 0}
      />

      <IconButton
        icon='chevron-right'
        onPress={handleRightPress}
        disabled={page === totalPage - 1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    position: 'absolute',
    bottom: height / 3,
    left: 2,
    right: 0,
    zIndex: 100,
  },
})
