import { PropsWithChildren, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { H4 } from '@/src/components/shared'
import { MD3Colors } from 'react-native-paper'

interface Props {
  title?: string
}

export function SettingsContainer({
  children,
  title,
}: PropsWithChildren<Props>) {
  const memoizedStyle = useMemo(
    () => ({
      backgroundColor: MD3Colors.neutral40,
    }),
    [],
  )
  return (
    <View style={styles.container}>
      {title && <H4 style={styles.title}>{title}</H4>}
      <View style={[styles.content, memoizedStyle]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    marginLeft: 28,
  },
  content: {
    borderRadius: 16,
  },
})
