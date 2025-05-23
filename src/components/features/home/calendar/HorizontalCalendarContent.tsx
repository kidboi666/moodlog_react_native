import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { Layout } from '@/constants'
import { useThemedStyles } from '@/hooks'
import { DateCountDot } from './DateCountDot'
import { DayAndDate } from './DayAndDate'

interface Props {
  selected: boolean
  today: boolean
  onPress: () => void
  futureDateColor: string
  date: `${number}-${number}-${number}`
  journalCount: number
}

export function HorizontalCalendarContent({
  selected,
  today,
  onPress,
  futureDateColor,
  date,
  journalCount,
}: Props) {
  const themedStyles = useThemedStyles(({ colors }) => ({
    selected: {
      backgroundColor: colors.background.inverse,
    },
  }))
  return (
    <Button
      style={[
        styles.container,
        selected ? themedStyles.selected : undefined,
        today ? styles.today : undefined,
      ]}
      onPress={onPress}
    >
      <DayAndDate futureDateColor={futureDateColor} date={date} />
      <DateCountDot
        variant='contained'
        journalCount={journalCount}
        isSelected={selected}
      />
    </Button>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width: Layout.SPACE.CALENDAR_SCROLL_SIZE,
    borderRadius: 16,
  },
  today: {
    borderWidth: 1,
  },
})
