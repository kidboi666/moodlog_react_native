import { Layout } from '@/shared/constants'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Dimensions } from 'react-native'
import { Button, XStack, styled } from 'tamagui'

const { height } = Dimensions.get('window')

interface Props {
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  show: boolean
}

export const MoodPagination = ({ page, setPage, totalPage, show }: Props) => {
  const handleLeftPress = useCallback(() => {
    setPage(([page, totalPage]) => [
      (page + totalPage - 1) % totalPage,
      totalPage,
    ])
  }, [])

  const handleRightPress = useCallback(() => {
    setPage(([page, totalPage]) => [(page + 1) % totalPage, totalPage])
  }, [])

  if (!show) {
    return null
  }

  return (
    <Container>
      <Button
        chromeless
        color='$color11'
        icon={ChevronLeft}
        scaleIcon={1.5}
        onPress={handleLeftPress}
      />

      {page !== totalPage - 1 && (
        <Button
          chromeless
          color='$color11'
          icon={ChevronRight}
          scaleIcon={1.5}
          onPress={handleRightPress}
        />
      )}
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
