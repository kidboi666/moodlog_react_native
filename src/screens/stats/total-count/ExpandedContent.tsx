import { useTranslation } from 'react-i18next';
import { Minimize2 } from '@tamagui/lucide-icons';
import { EmptyContent } from '@/screens/stats/EmptyContent';
import { ExpressiveMonthStats } from '@/types/entries';
import { getMonthStringWithoutYear } from '@/utils/common';
import * as S from './ExpandedContent.styled';

interface Props {
  totalFrequency: number;
  totalActiveDay: string;
  totalCount: number;
  daysSinceSignup: number;
  expressiveMonthStats: ExpressiveMonthStats;
}

export const ExpandedContent = ({
  totalFrequency,
  totalActiveDay,
  totalCount,
  daysSinceSignup,
  expressiveMonthStats,
}: Props) => {
  const { t } = useTranslation();
  if (!totalCount) {
    return <EmptyContent />;
  }

  return (
    <S.ViewContainer>
      <S.DaysSinceSignupBox>
        <S.DaysSinceSignupTitle>
          {t('records.stats.totalCount.daysSinceSignup.title')}
        </S.DaysSinceSignupTitle>
        <S.DaysSinceSignupDescription>
          {t('records.stats.totalCount.daysSinceSignup.description', {
            date: daysSinceSignup,
          })}
        </S.DaysSinceSignupDescription>
      </S.DaysSinceSignupBox>
      <S.FrequencyBox>
        <S.FrequencyTitle>
          {t('records.stats.totalCount.frequency.title')}
        </S.FrequencyTitle>
        <S.FrequencyDescription>
          {totalFrequency === 0
            ? t('records.stats.totalCount.frequency.everyDay')
            : t('records.stats.totalCount.frequency.description', {
                date: totalFrequency,
              })}
        </S.FrequencyDescription>
      </S.FrequencyBox>
      <S.MostDayBox>
        <S.MostDayTitle>
          {t('records.stats.totalCount.mostDay.title')}
        </S.MostDayTitle>
        <S.MostDayDescription>
          {t('records.stats.totalCount.mostDay.description', {
            day: t(`calendar.days.${totalActiveDay}`),
          })}
        </S.MostDayDescription>
      </S.MostDayBox>
      <S.ExpressiveMonthBox>
        <S.ExpressiveMonthTitle>
          {t('records.stats.totalCount.expressiveMonth.title')}
        </S.ExpressiveMonthTitle>
        <S.ExpressiveMonthDescription>
          {t('records.stats.totalCount.expressiveMonth.description', {
            month: t(
              `calendar.months.${getMonthStringWithoutYear(expressiveMonthStats.month)}`,
            ),
            count: expressiveMonthStats.count,
          })}
        </S.ExpressiveMonthDescription>
      </S.ExpressiveMonthBox>
      <S.MinimizeButton icon={Minimize2} />
    </S.ViewContainer>
  );
};
