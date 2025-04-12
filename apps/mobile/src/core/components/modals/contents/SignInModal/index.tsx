import { router } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
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

import { BottomSheetContainer } from '@/core/components/modals/BottomSheetContainer'
import { API_URL } from '@/core/constants/api'
import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'

export const SignInModal = () => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useAuth(state => state.setUser)
  const setToken = useAuth(state => state.setToken)
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(t('auth.error'), t('auth.emptyFields'))
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || t('auth.loginFailed'))
      }

      setUser(data.user)
      setToken(data.token)
      router.replace('/(tabs)')
    } catch (error) {
      Alert.alert(t('auth.error'), error.message)
    } finally {
      setIsLoading(false)
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
              value={username}
              onChangeText={setUsername}
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
