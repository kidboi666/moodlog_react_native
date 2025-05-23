import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H3 } from '@/components/shared'
import { WEEK_DAY } from '@/constants'
import { useColors } from '@/hooks'
import { LinearGradient } from 'expo-linear-gradient'

const mockData = [true, true, false, false, false, false, false]

export function DayBox() {
  const { tokens } = useColors()
  const fillDay = [tokens.primary['900'], tokens.primary['400']]
  const emptyDay = [tokens.neutral['900'], tokens.neutral['400']]
  return (
    <View style={styles.container}>
      {Object.values(WEEK_DAY).map((day, i) => (
        <View key={day} style={styles.dayBox}>
          <LinearGradient
            style={styles.gradient}
            colors={mockData[i] ? (fillDay as any) : (emptyDay as any)}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 2, y: 3 }}
          />
          <H3>{day}</H3>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dayBox: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },
  gradient: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
})
