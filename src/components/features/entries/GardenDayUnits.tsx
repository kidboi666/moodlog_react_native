import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { View, YStack, styled } from 'tamagui'

import { H6 } from '@/components/shared'
import { WEEK_DAY } from '@/constants'

export const GardenDayUnits = memo(() => {
  const { t } = useTranslation()
  return (
    <DaysContainer>
      <EmptyBox />
      <DaysBox>
        {Object.keys(WEEK_DAY).map(day => (
          <DayText key={day}>{t(`calendar.daysShort.${day}`)}</DayText>
        ))}
      </DaysBox>
    </DaysContainer>
  )
})

const DaysContainer = styled(YStack, {
  py: '$4',
})

const EmptyBox = styled(View, {
  width: '$2',
  height: '$2',
})

const DaysBox = styled(YStack, {
  flex: 1,
  height: '100%',
  justify: 'space-between',
})

const DayText = styled(H6, {
  fontSize: '$3',
  color: '$color10',
})
