import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { useJournalCounts } from '@/src/features/home/hooks'
import { GradientBox, H1 } from '@/src/shared/components'
import { DELAY_MS } from '@/src/shared/constants'
import { ISODateString } from '@/src/shared/types'
import { getMonthKey } from '@/src/shared/utils'
import { Calendar } from './Calendar'

interface Props {
  selectedDate: ISODateString
  onSelectedDateChange: (date: ISODateString) => void
}

function _CurrentMonthCalendar({ selectedDate, onSelectedDateChange }: Props) {
  const theme = useTheme()
  const { t } = useTranslation()
  const { dateCount, isLoading } = useJournalCounts(selectedDate)

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  return (
    <Animated.View entering={FadeIn.delay(DELAY_MS.ANIMATION.MEDIUM * 2)}>
      <GradientBox>
        <View style={styles.monthBox}>
          <H1 style={{ color: theme.colors.surface }}>
            {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
          </H1>
        </View>
        <Calendar
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
})

export const CurrentMonthCalendar = memo(_CurrentMonthCalendar)
CurrentMonthCalendar.displayName = 'WeekDay'
