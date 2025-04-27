import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useWindowDimensions } from 'react-native'
import { Button } from 'tamagui'

import { Layout } from '@/shared/constants'

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
      <Button
        bg='transparent'
        icon={ChevronLeft}
        onPress={onLeftPress}
        position='absolute'
        l={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
        t={height / 2.2}
      />

      {page !== totalPage - 1 && (
        <Button
          bg='transparent'
          icon={ChevronRight}
          onPress={onRightPress}
          position='absolute'
          r={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
          t={height / 2.2}
        />
      )}
    </>
  )
}
