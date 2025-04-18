import { useTranslation } from 'react-i18next'
import { Group } from 'tamagui'

import { TimeRange } from '@/types'

import * as S from './TimeRangeZone.styled'

interface Props {
  timeRange: TimeRange
  onTimeRangeChange: (timeRange: TimeRange) => void
}

export const TimeRangeZone = ({ timeRange, onTimeRangeChange }: Props) => {
  const { t } = useTranslation()
  return (
    <S.XGroupBox orientation='horizontal'>
      <Group.Item>
        <S.TimeRangeButton
          onPress={() => onTimeRangeChange(TimeRange.YEARLY)}
          isSelected={timeRange === TimeRange.YEARLY}
        >
          {t('statistics.timeRange.yearly')}
        </S.TimeRangeButton>
      </Group.Item>
      <S.Separator />
      <Group.Item>
        <S.TimeRangeButton
          onPress={() => onTimeRangeChange(TimeRange.MONTHLY)}
          isSelected={timeRange === TimeRange.MONTHLY}
        >
          {t('statistics.timeRange.monthly')}
        </S.TimeRangeButton>
      </Group.Item>
    </S.XGroupBox>
  )
}
