import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { H6 } from '@/components/shared'

interface Props {
  month: string
}

function _GardenMonthUnits({ month }: Props) {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <H6>{t(`calendar.months.${month}`)}</H6>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 4,
  },
})

export const GardenMonthUnits = memo(_GardenMonthUnits)

GardenMonthUnits.displayName = 'GardenMonthUnits'
