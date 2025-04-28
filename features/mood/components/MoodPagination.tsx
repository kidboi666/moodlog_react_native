import { Dispatch, Fragment, SetStateAction, useCallback } from 'react'

import { PaginationButton } from '@/features/mood/components'
import { PaginationDot } from '@/shared/components'

interface Props {
  page: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  totalPage: number
  show: boolean
}
export const MoodPagination = ({ page, setPage, totalPage, show }: Props) => {
  if (!show) {
    return null
  }

  const handleLeftPress = useCallback(() => {
    setPage(([page, totalPage]) => [
      (page + totalPage - 1) % totalPage,
      totalPage,
    ])
  }, [])

  const handleRightPress = useCallback(() => {
    setPage(([page, totalPage]) => [(page + 1) % totalPage, totalPage])
  }, [])

  return (
    <Fragment>
      <PaginationButton
        page={page}
        totalPage={totalPage}
        onLeftPress={handleLeftPress}
        onRightPress={handleRightPress}
      />
      <PaginationDot totalPage={totalPage} page={page} />
    </Fragment>
  )
}
