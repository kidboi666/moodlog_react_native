import React, { memo } from 'react'
import { StyleSheet } from 'react-native'

import { IconButton } from '@/components/shared'
import { useRouter } from 'expo-router'

function _WriteButton() {
  const router = useRouter()
  return (
    <IconButton
      icon='plus'
      variant='inverse'
      style={styles.button}
      onPress={() => router.push('/write')}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
})

export const WriteButton = memo(_WriteButton)
WriteButton.displayName = 'WriteButton'
