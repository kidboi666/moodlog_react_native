import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import type { BottomSheetProps, BottomSheetType } from '@/types'

import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'
import * as S from './LogoutModal.styled'

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
      <S.BottomSheetContainer>
        <S.ModalTitle>
          {t('settings.logout.confirmTitle') || '로그아웃'}
        </S.ModalTitle>
        <S.ModalDescription>
          {t('settings.logout.confirmMessage') || '정말 로그아웃 하시겠습니까?'}
        </S.ModalDescription>
        <S.ModalContentYStack>
          <S.ConfirmButton onPress={handleLogout}>
            {t('auth.logout') || '로그아웃'}
          </S.ConfirmButton>
          <S.CancelButton onPress={hideBottomSheet}>
            {t('common.cancel') || '취소'}
          </S.CancelButton>
        </S.ModalContentYStack>
      </S.BottomSheetContainer>
    )
  },
)
