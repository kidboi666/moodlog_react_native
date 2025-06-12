import { Pressable, StyleSheet } from 'react-native'

import { Layout } from '@/constants'
import { useTheme } from 'react-native-paper'
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
  const theme = useTheme()
  return (
    <Pressable
      style={[
        styles.container,
        selected ? { backgroundColor: theme.colors.surfaceVariant } : undefined,
        today ? { borderWidth: 1 } : undefined,
      ]}
      onPress={onPress}
    >
      <DayAndDate futureDateColor={futureDateColor} date={date} />
      <DateCountDot
        variant='contained'
        journalCount={journalCount}
        isSelected={selected}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width: Layout.SPACE.CALENDAR_SCROLL_SIZE,
    borderRadius: 16,
  },
})
