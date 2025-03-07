import { Text } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { WEEK_DAY } from '@/constants/date';
import { useTranslation } from 'react-i18next';
import * as S from './CalendarHeader.styled';

export const CalendarHeader = () => {
  const { t } = useTranslation();
  return (
    <S.HeaderContainer>
      <S.NavigationBox>
        <S.ArrowButton icon={<ArrowLeft size="$1" />} />
        <S.YearText>2025</S.YearText>
        <S.ArrowButton icon={<ArrowRight size="$1" />} />
      </S.NavigationBox>
      <S.DayContainer>
        {Object.keys(WEEK_DAY).map((week, i) => (
          <Text key={i}>{t(`calendar.days.${week}`)}</Text>
        ))}
      </S.DayContainer>
    </S.HeaderContainer>
  );
};
