import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, { FadeIn } from 'react-native-reanimated'
import { XStack, styled } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import { H1 } from '@/components/shared'
import { DelayMS } from '@/constants'
import { DateCount, ISODateString, Maybe } from '@/types'
import { getMonthKey } from '@/utils'
import { HorizontalCalendar } from './calendar/HorizontalCalendar'

interface Props {
  selectedDate: Maybe<ISODateString>
  onSelectedDateChange: (date: ISODateString) => void
  dateCount?: DateCount
}

function _WeekDay({ selectedDate, onSelectedDateChange, dateCount }: Props) {
  const { t } = useTranslation()

  return (
    <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.MEDIUM[1])}>
      <OuterGradientBox>
        <InnerGradientBox>
          <CurrentMonthBox>
            <CurrentMonthText>
              {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
            </CurrentMonthText>
          </CurrentMonthBox>

          <HorizontalCalendar
            selectedDate={selectedDate}
            onSelectedDateChange={onSelectedDateChange}
            dateCount={dateCount}
          />
        </InnerGradientBox>
      </OuterGradientBox>
    </Animated.View>
  )
}

const OuterGradientBox = styled(LinearGradient, {
  p: '$1.5',
  rounded: '$8',
  colors: ['$gray12', '$gray11'],
  start: [0, -0.6],
  end: [2, 0],
})

const InnerGradientBox = styled(LinearGradient, {
  p: '$4',
  rounded: '$7',
  colors: ['$gray11', '$gray12'],
  start: [0, -0.6],
  end: [0.3, 0],
})

const CurrentMonthBox = styled(XStack, {
  justify: 'space-between',
})

const CurrentMonthText = styled(H1, {
  color: '$gray1',
})

export const WeekDay = memo(_WeekDay)

WeekDay.displayName = 'WeekDay'
