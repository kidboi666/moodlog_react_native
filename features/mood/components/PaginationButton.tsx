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
        color='$color11'
        icon={<ChevronLeft size='$1' />}
        onPress={onLeftPress}
        position='absolute'
        l={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
        t={height / 4}
      />

      {page !== totalPage - 1 && (
        <Button
          bg='transparent'
          color='$color11'
          icon={<ChevronRight size='$1' />}
          onPress={onRightPress}
          position='absolute'
          r={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
          t={height / 4}
        />
      )}
    </>
  )
}
