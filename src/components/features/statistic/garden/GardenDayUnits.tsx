import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { H6 } from '@/src/components/shared'
import { WEEK_DAY } from '@/src/constants'

function _GardenDayUnits() {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.emptyBox} />
      <View style={styles.daysBox}>
        {Object.keys(WEEK_DAY).map(day => (
          <H6 key={day}>{t(`calendar.daysShort.${day}`)}</H6>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  emptyBox: {
    width: 4,
    height: 4,
  },
  daysBox: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
})

export const GardenDayUnits = memo(_GardenDayUnits)

GardenDayUnits.displayName = 'GardenDayUnits'
