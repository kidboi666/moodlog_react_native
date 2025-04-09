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
import { useAuth } from '@/core/store/auth.store';

export default function LoginScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuth(state => state.setUser);
  const setToken = useAuth(state => state.setToken);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(t('auth.error'), t('auth.emptyFields'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.loginFailed'));
      }

      setUser(data.user);
      setToken(data.token);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(t('auth.error'), error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <YStack space="$4" width="100%">
        <H1>{t('auth.login')}</H1>
        <Form onSubmit={handleLogin}>
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
            <Button themeInverse onPress={handleLogin} disabled={isLoading}>
              {isLoading ? t('common.loading') : t('auth.loginButton')}
            </Button>
          </YStack>
        </Form>

        <Separator />

        <XStack
          style={{ alignItems: 'center', justifyContent: 'center' }}
          space="$2"
        >
          <Text>{t('auth.noAccount')}</Text>
          <Text color="$blue10" onPress={navigateToRegister}>
            {t('auth.register')}
          </Text>
        </XStack>
      </YStack>
    </View>
  );
}
