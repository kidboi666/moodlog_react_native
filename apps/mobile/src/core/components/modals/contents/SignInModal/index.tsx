import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Form,
  H3,
  Input,
  Separator,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui'
import { BottomSheetContainer } from '../../BottomSheetContainer'

interface SignInModalProps {
  hideBottomSheet: () => void
}

export const SignInModal = ({ hideBottomSheet }: SignInModalProps) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showBottomSheet } = useBottomSheet()
  const { login, isLoading, error } = useAuth()

  const handleLogin = async () => {
    await login(email, password)
    if (!error) {
      hideBottomSheet()
    }
  }

  const navigateToRegister = () => {
    showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS)
  }

  return (
    <BottomSheetContainer>
      <YStack gap='$4' width='100%'>
        <H3>{t('auth.login')}</H3>
        <Form onSubmit={handleLogin}>
          <YStack gap='$4'>
            <Input
              placeholder={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />
            <Input
              placeholder={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button themeInverse onPress={handleLogin} disabled={isLoading}>
              {isLoading ? () => <Spinner /> : t('auth.loginButton')}
            </Button>
          </YStack>
        </Form>

        <Separator />

        <XStack items='center' justify='center' gap='$2'>
          <Text>{t('auth.noAccount')}</Text>
          <Text color='$blue10' onPress={navigateToRegister}>
            {t('common.join')}
          </Text>
        </XStack>
      </YStack>
    </BottomSheetContainer>
  )
}
