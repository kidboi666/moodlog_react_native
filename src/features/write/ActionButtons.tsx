import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Button } from '@/src/shared/components'

interface Props {
  onImageUriChange: () => void
  show: boolean
}

function _ActionButtons({ onImageUriChange, show }: Props) {
  const { t } = useTranslation()

  if (!show) {
    return null
  }

  return (
    <View style={styles.container}>
      <Button onPress={onImageUriChange} icon='image-plus'>
        <Text>{t('common.addCover')}</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
})

export const ActionButtons = memo(_ActionButtons)

ActionButtons.displayName = 'ActionButtons'
