import { Fragment } from 'react'

import { PaginationButton } from '@/features/mood/components'
import { PaginationDot } from '@/shared/components'

interface Props {
  page: number
  totalPage: number
  onLeftPress: () => void
  onRightPress: () => void
  show: boolean
}
export const MoodPagination = ({
  page,
  totalPage,
  onLeftPress,
  onRightPress,
  show,
}: Props) => {
  if (!show) {
    return null
  }

  return (
    <Fragment>
      <PaginationButton
        page={page}
        totalPage={totalPage}
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
      />
      <PaginationDot totalPage={totalPage} page={page} />
    </Fragment>
  )
}
