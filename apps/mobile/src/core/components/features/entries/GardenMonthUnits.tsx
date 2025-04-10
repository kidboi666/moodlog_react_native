import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './GardenMonthUnits.styled'

interface Props {
  month: string
}

export const GardenMonthUnits = memo(({ month }: Props) => {
  const { t } = useTranslation()
  return (
    <S.ViewContainer>
      <S.MonthText>{t(`calendar.months.${month}`)}</S.MonthText>
    </S.ViewContainer>
  )
})
