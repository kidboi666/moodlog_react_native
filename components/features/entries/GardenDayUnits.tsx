import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { WEEK_DAY } from '@/constants'

import * as S from './GardenDayUnits.styled'

export const GardenDayUnits = memo(() => {
  const { t } = useTranslation()
  return (
    <S.DaysContainer>
      <S.EmptyBox />
      <S.DaysBox>
        {Object.keys(WEEK_DAY).map(day => (
          <S.DayText key={day}>{t(`calendar.daysShort.${day}`)}</S.DayText>
        ))}
      </S.DaysBox>
    </S.DaysContainer>
  )
})
