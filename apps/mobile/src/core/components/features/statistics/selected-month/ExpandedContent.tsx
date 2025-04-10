import { Minimize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'

import { moodTheme } from '@/core/constants/themes'
import { MoodLevel, type MoodType } from '@/types/mood.types'
import type { SelectedMonthStats } from '@/types/statistic.types'
import { getMonthKey } from '@/utils/date'
import * as S from './ExpandedContent.styled'

interface Props {
  selectedMonthStats: SelectedMonthStats
}

export const ExpandedContent = ({ selectedMonthStats }: Props) => {
  const { t } = useTranslation()
  const {
    month: ISOMonthString,
    count,
    activeDay,
    frequency,
    signatureMood,
  } = selectedMonthStats

  const month = t(`calendar.months.${getMonthKey(ISOMonthString)}`)

  return (
    <S.MonthlyStatsContainer>
      <S.MoodSummaryHeader
        bg={moodTheme[signatureMood.type as MoodType][MoodLevel.FULL]}
      >
        <S.SignatureMoodLabel>
          {t('statistics.statistics.currentMonth.mood', { month })}
        </S.SignatureMoodLabel>
        <S.SignatureMoodValue>
          {signatureMood
            ? t(`mood.types.${signatureMood.type}`)
            : t('common.fallback.text')}
        </S.SignatureMoodValue>
      </S.MoodSummaryHeader>

      <S.StatsDetailContainer>
        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.statistics.currentMonth.journalCount.title', {
              month,
            })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {t('statistics.stats.currentMonth.journalCount.description', {
              count,
            })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.statistics.currentMonth.frequency.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {frequency === 0
              ? t('statistics.statistics.currentMonth.frequency.everyDay', {
                  month,
                })
              : t('statistics.statistics.currentMonth.frequency.description', {
                  date: frequency,
                  month,
                })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.StatsSectionBox>
          <S.StatsSectionTitle>
            {t('statistics.statistics.currentMonth.mostDay.title', { month })}
          </S.StatsSectionTitle>
          <S.StatsSectionDescription>
            {t('statistics.statistics.currentMonth.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
              month,
            })}
          </S.StatsSectionDescription>
        </S.StatsSectionBox>

        <S.MinimizeButton icon={Minimize2} />
      </S.StatsDetailContainer>
    </S.MonthlyStatsContainer>
  )
}
