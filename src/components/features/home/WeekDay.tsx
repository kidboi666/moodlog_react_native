import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { H1 } from '@/components/shared'
import { GradientBox } from '@/components/shared/GradientBox'
import { DelayMS } from '@/constants'
import { useThemedStyles } from '@/hooks'
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
  const themedStyles = useThemedStyles(({ colors }) => ({
    innerText: {
      color: colors.text.inverse,
    },
  }))
  return (
    <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.MEDIUM[1])}>
      <GradientBox>
        <View style={styles.monthBox}>
          <H1 style={[themedStyles.innerText, styles.month]}>
            {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
          </H1>
        </View>
        <HorizontalCalendar
          selectedDate={selectedDate}
          onSelectedDateChange={onSelectedDateChange}
          dateCount={dateCount}
        />
      </GradientBox>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  monthBox: {
    justifyContent: 'center',
  },
  month: {
    fontWeight: 800,
  },
})

export const WeekDay = memo(_WeekDay)
WeekDay.displayName = 'WeekDay'
