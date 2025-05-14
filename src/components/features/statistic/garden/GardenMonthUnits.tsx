import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { View, styled } from 'tamagui'

import { H6 } from '@/components/shared'

interface Props {
  month: string
}

function _GardenMonthUnits({ month }: Props) {
  const { t } = useTranslation()
  return (
    <ViewContainer>
      <MonthText>{t(`calendar.months.${month}`)}</MonthText>
    </ViewContainer>
  )
}

const ViewContainer = styled(View, {
  height: '$2',
})

const MonthText = styled(H6, {
  fontSize: '$4',
  fontWeight: '500',
  color: '$color10',
})

export const GardenMonthUnits = memo(_GardenMonthUnits)

GardenMonthUnits.displayName = 'GardenMonthUnits'
