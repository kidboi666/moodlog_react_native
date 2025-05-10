import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Dimensions } from 'react-native'
import { Button, XStack, styled } from 'tamagui'

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
    <Container>
      <Button
        chromeless
        color='$color11'
        icon={ChevronLeft}
        scaleIcon={1.5}
        onPress={handleLeftPress}
        disabled={page === 0}
        opacity={page !== 0 ? 1 : 0}
      />

      <Button
        chromeless
        color='$color11'
        icon={ChevronRight}
        scaleIcon={1.5}
        onPress={handleRightPress}
        disabled={page === totalPage - 1}
        opacity={page !== totalPage - 1 ? 1 : 0}
      />
    </Container>
  )
}

const Container = styled(XStack, {
  justify: 'space-between',
  position: 'absolute',
  width: '100%',
  l: 2,
  b: height / 3,
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
})
