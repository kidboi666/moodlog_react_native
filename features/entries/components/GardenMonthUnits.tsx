import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { H6 } from '@/shared/components'
import { View, styled } from 'tamagui'

const ViewContainer = styled(View, {
  height: '$2',
})

const MonthText = styled(H6, {
  fontSize: '$4',
  fontWeight: '500',
  color: '$color10',
})

interface Props {
  month: string
}

export const GardenMonthUnits = memo(({ month }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer>
      <MonthText>{t(`calendar.months.${month}`)}</MonthText>
    </ViewContainer>
  )
})
