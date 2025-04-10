import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import {
  Button,
  Form,
  H1,
  Input,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui';

import { BottomSheetContainer } from '@/core/components/modals/BottomSheetContainer';

interface Props {
  userName: string;
  goLoginPage: () => void;
}

export const SignUpModal = ({ userName, goLoginPage }: Props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert(t('auth.error'), t('auth.emptyFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('auth.error'), t('auth.passwordMismatch'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username: userName, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.registerFailed'));
      }

      Alert.alert(t('auth.success'), t('auth.registerSuccess'), [
        {
          text: t('common.ok'),
          onPress: () => goLoginPage(),
        },
      ]);
    } catch (error) {
      Alert.alert(t('auth.error'), error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheetContainer>
      <YStack gap="$4" width="100%">
        <H1>{t('auth.register')}</H1>
        <Form onSubmit={handleRegister}>
          <YStack gap="$4">
            <Input
              placeholder={t('auth.email')}
              value={email}
              onChangeText={setEmail}
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
            <Button themeInverse onPress={handleRegister} disabled={isLoading}>
              {isLoading ? t('common.loading') : t('auth.registerButton')}
            </Button>
          </YStack>
        </Form>

        <Separator />

        <XStack items="center" justify="center" gap="$2">
          <Text>{t('auth.hasAccount')}</Text>
          <Text color="$blue10" onPress={goLoginPage}>
            {t('auth.login')}
          </Text>
        </XStack>
      </YStack>
    </BottomSheetContainer>
  );
};
