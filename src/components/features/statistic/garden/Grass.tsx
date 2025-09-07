import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

import { Maybe } from '@/src/types'
import { useTheme } from 'react-native-paper'

interface Props {
  moodColor: Maybe<string>
}

function _Grass({ moodColor }: Props) {
  const theme = useTheme()
  if (!moodColor) return <View style={styles.container} />
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            moodColor === 'isEmpty' ? theme.colors.background : moodColor,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
})

export const Grass = memo(_Grass)
Grass.displayName = 'Grass'
