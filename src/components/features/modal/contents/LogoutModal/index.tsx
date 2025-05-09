import { supabase } from '@/lib/supabase'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { YStack, styled } from 'tamagui'

import { BaseText, H3, PressableButton } from '@/components/shared'
import type { BottomSheetProps, BottomSheetType } from '@/types'
import { BottomSheetContainer } from '../../BottomSheetContainer'

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
        <Title>{t('settings.logout.confirmTitle')}</Title>
        <BaseText text='center' color='$gray11'>
          {t('settings.logout.confirmMessage')}
        </BaseText>
        <ButtonContainer>
          <PressableButton bg='$red9' color='white' onPress={handleLogout}>
            {t('auth.logout')}
          </PressableButton>
          <PressableButton onPress={hideBottomSheet}>
            {t('common.cancel')}
          </PressableButton>
        </ButtonContainer>
      </BottomSheetContainer>
    )
  },
)

const Title = styled(H3, {
  text: 'center',
})

const ButtonContainer = styled(YStack, {
  gap: '$3',
  mt: '$2',
})
