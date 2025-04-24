import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, styled } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import { getMonthKey } from 'shared/utils'

import { AnimatedEntry, H1 } from '@/shared/components'
import { ANIMATION_DELAY_MS } from 'shared/constants'
import { HorizontalCalendar } from './calendar/HorizontalCalendar'

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

export const WeekDay = memo(() => {
  const { t } = useTranslation()

  return (
    <AnimatedEntry delay={ANIMATION_DELAY_MS[2]}>
      <OuterGradientBox>
        <InnerGradientBox>
          <CurrentMonthBox>
            <CurrentMonthText>
              {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
            </CurrentMonthText>
          </CurrentMonthBox>
          <HorizontalCalendar />
        </InnerGradientBox>
      </OuterGradientBox>
    </AnimatedEntry>
  )
})
