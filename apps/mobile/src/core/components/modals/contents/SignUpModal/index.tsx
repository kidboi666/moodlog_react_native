import { useAuth } from '@/core/store/auth.store'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Form,
  H1,
  Input,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui'
import { BottomSheetContainer } from '../../BottomSheetContainer'

interface SignUpModalProps {
  hideBottomSheet: () => void
  goLoginPage: () => void
}

export const SignUpModal = ({
  hideBottomSheet,
  goLoginPage,
}: SignUpModalProps) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { signup, isLoading, error } = useAuth()

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    await signup(email, password)
    if (!error) {
      hideBottomSheet()
      goLoginPage()
    }
  }

  return (
    <BottomSheetContainer>
      <YStack gap='$4' width='100%'>
        <H1>{t('auth.register')}</H1>
        <Form onSubmit={handleSignUp}>
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
            <Input
              placeholder={t('auth.confirmPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button themeInverse onPress={handleSignUp} disabled={isLoading}>
              {isLoading ? t('common.loading') : t('auth.registerButton')}
            </Button>
          </YStack>
        </Form>

        <Separator />

        <XStack items='center' justify='center' gap='$2'>
          <Text>{t('auth.hasAccount')}</Text>
          <Text color='$blue10' onPress={goLoginPage}>
            {t('common.login')}
          </Text>
        </XStack>
      </YStack>
    </BottomSheetContainer>
  )
}
