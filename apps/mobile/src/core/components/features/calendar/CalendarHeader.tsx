import { useTranslation } from 'react-i18next'
import { Text } from 'tamagui'

import { WEEK_DAY } from '@/core/constants/date'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import * as S from './CalendarHeader.styled'

export const CalendarHeader = () => {
  const { t } = useTranslation()
  return (
    <S.HeaderContainer>
      <S.NavigationBox>
        <S.ArrowButton icon={ArrowLeft} />
        <S.YearText>2025</S.YearText>
        <S.ArrowButton icon={ArrowRight} />
      </S.NavigationBox>
      <S.DayContainer>
        {Object.keys(WEEK_DAY).map((week, i) => (
          <Text key={`${i}-${week}`}>{t(`calendar.days.${week}`)}</Text>
        ))}
      </S.DayContainer>
    </S.HeaderContainer>
  )
}
