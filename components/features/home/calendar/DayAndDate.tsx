import { useTranslation } from 'react-i18next'
import { YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared'
import { DateUtils } from '@/utils'

interface DayAndDateProps {
  selected: boolean
  futureDateColor: '$color6' | '$color11' | '$color12'
  date: `${number}-${number}-${number}`
}

export const DayAndDate = ({
  selected,
  futureDateColor,
  date,
}: DayAndDateProps) => {
  const { t } = useTranslation()
  return (
    <DateTextWrapper>
      <DayText isSelected={selected}>
        {t(`calendar.days.${DateUtils.getDayFromISODate(date)}`)}
      </DayText>
      <DateText futureDateColor={futureDateColor}>
        {DateUtils.getDateFromISODate(date)}
      </DateText>
    </DateTextWrapper>
  )
}

const DateTextWrapper = styled(YStack, {
  gap: '$2',
  items: 'center',
})

const DayText = styled(BaseText, {
  color: '$gray9',

  variants: {
    isSelected: {
      true: {
        color: '$gray12',
      },
    },
  } as const,
})

const DateText = styled(BaseText, {
  fontWeight: '800',
  fontSize: '$6',

  variants: {
    futureDateColor: {
      ':string': color => {
        return { color }
      },
    },
  } as const,
})
