import React, { useState } from 'react';

import { Alert } from 'react-native';

import { useTranslation } from 'react-i18next';

import { router } from 'expo-router';

import {
  Button,
  Form,
  H1,
  Input,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';

import { API_URL } from '@/core/constants/api';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert(t('auth.error'), t('auth.emptyFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('auth.error'), t('auth.passwordMismatch'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.registerFailed'));
      }

      Alert.alert(t('auth.success'), t('auth.registerSuccess'), [
        {
          text: t('common.ok'),
          onPress: () => router.push('/login'),
        },
      ]);
    } catch (error) {
      Alert.alert(t('auth.error'), error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <View flex={1} justifyContent="center" padding="$4">
      <YStack space="$4">
        <H1>{t('auth.register')}</H1>
        <Form onSubmit={handleRegister}>
          <YStack space="$4">
            <Input
              placeholder={t('auth.username')}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
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
            <Button
              themeInverse
              onPress={handleRegister}
              disabled={isLoading}
              loading={isLoading}
            >
              {t('auth.registerButton')}
            </Button>
          </YStack>
        </Form>

        <Separator />

        <XStack justifyContent="center" space="$2">
          <Text>{t('auth.hasAccount')}</Text>
          <Text color="$blue10" onPress={navigateToLogin}>
            {t('auth.login')}
          </Text>
        </XStack>
      </YStack>
    </View>
  );
}
