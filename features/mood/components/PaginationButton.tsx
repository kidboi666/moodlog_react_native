import { CONTAINER_HORIZONTAL_PADDING } from '@/shared/constants'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useWindowDimensions } from 'react-native'
import { Button } from 'tamagui'

interface Props {
  page: number
  totalPage: number
  onLeftPress: () => void
  onRightPress: () => void
}

export const PaginationButton = ({
  page,
  totalPage,
  onLeftPress,
  onRightPress,
}: Props) => {
  const { height } = useWindowDimensions()
  return (
    <>
      {page !== 0 && (
        <Button
          bg='transparent'
          icon={ChevronLeft}
          onPress={onLeftPress}
          position='absolute'
          l={CONTAINER_HORIZONTAL_PADDING}
          t={height / 2.2}
        />
      )}

      {page !== totalPage - 1 && (
        <Button
          bg='transparent'
          icon={ChevronRight}
          onPress={onRightPress}
          position='absolute'
          r={CONTAINER_HORIZONTAL_PADDING}
          t={height / 2.2}
        />
      )}
    </>
  )
}
