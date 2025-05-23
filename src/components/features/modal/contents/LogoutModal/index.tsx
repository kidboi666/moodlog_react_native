import { supabase } from '@/lib/supabase'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Button, H3 } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
import type { BottomSheetProps, BottomSheetType } from '@/types'
import { BottomSheetContainer } from '../../BottomSheetContainer'

function _LogoutModal({
  hideBottomSheet,
}: BottomSheetProps[BottomSheetType.LOGOUT]) {
  const { t } = useTranslation()

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert(t('common.error'), error.message)
      console.error(error)
    }
    hideBottomSheet()
  }, [hideBottomSheet])

  const themedStyles = useThemedStyles(({ colors }) => ({
    description: {
      color: colors.text.tertiary,
    },
  }))

  return (
    <BottomSheetContainer>
      <H3 style={styles.title}>{t('settings.logout.confirmTitle')}</H3>
      <Text style={themedStyles.description}>
        {t('settings.logout.confirmMessage')}
      </Text>
      <View style={styles.contentBox}>
        <Button variant='warning' onPress={handleLogout}>
          {t('auth.logout')}
        </Button>
        <Button onPress={hideBottomSheet}>{t('common.cancel')}</Button>
      </View>
    </BottomSheetContainer>
  )
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  contentBox: {
    gap: 12,
    marginTop: 8,
  },
})

export const LogoutModal = memo(_LogoutModal)

LogoutModal.displayName = 'LogoutModal'
