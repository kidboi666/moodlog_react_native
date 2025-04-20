import { supabase } from '@/lib/supabase'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { YStack } from 'tamagui'

import type { BottomSheetProps, BottomSheetType } from '@/types'

import { BottomSheetContainer } from '@/components/modals/BottomSheetContainer'
import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import { PressableButton } from '@/components/shared/PressableButton'

export const LogoutModal = memo(
  ({ hideBottomSheet }: BottomSheetProps[BottomSheetType.LOGOUT]) => {
    const { t } = useTranslation()

    const handleLogout = useCallback(async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        Alert.alert(t('common.error'), error.message)
        console.error(error)
      }
      hideBottomSheet()
    }, [hideBottomSheet])

    return (
      <BottomSheetContainer>
        <H3 text='center'>{t('settings.logout.confirmTitle')}</H3>
        <BaseText text='center' color='$gray11'>
          {t('settings.logout.confirmMessage')}
        </BaseText>
        <YStack gap='$3' mt='$2'>
          <PressableButton bg='$red9' color='white' onPress={handleLogout}>
            {t('auth.logout')}
          </PressableButton>
          <PressableButton onPress={hideBottomSheet}>
            {t('common.cancel')}
          </PressableButton>
        </YStack>
      </BottomSheetContainer>
    )
  },
)
