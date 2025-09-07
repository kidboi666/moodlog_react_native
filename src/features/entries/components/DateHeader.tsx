import { StyleSheet, View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'

import { useDateInfo } from '@/src/features/entries/hooks'
import { H4 } from '@/src/shared/components'

interface Props {
  date: string
}

export function DateHeader({ date }: Props) {
  const theme = useTheme()
  const dateInfo = useDateInfo(date)

  return (
    <View style={styles.container}>
      <H4 style={{ color: theme.colors.onPrimaryContainer }}>
        {dateInfo.day}.
      </H4>
      <Text style={{ color: theme.colors.onSurface }}>{dateInfo.weekday}</Text>
      <Divider style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 12,
    paddingHorizontal: 4,
    gap: 8,
  },
  divider: { flex: 1 },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})
