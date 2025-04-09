import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Button,
  H3,
  Input,
  Paragraph,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui';

import { SettingHeader } from '@/core/components/features/settings/SettingHeader';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { useUser } from '@/core/store/user.store';

import { NewUserInfo } from '@/types/user.types';

export default function Screen() {
  const { t } = useTranslation();
  const userInfo = useUser(state => state.userInfo);
  const onUserInfoChange = useUser(state => state.onUserInfoChange);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<NewUserInfo>({
    userName: userInfo.userName,
    email: userInfo.email,
    age: userInfo.age,
  });

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    await onUserInfoChange(form);
    setIsEditing(false);
  }, [form, onUserInfoChange]);

  const handleCancel = useCallback(() => {
    setForm({
      userName: userInfo.userName,
      email: userInfo.email,
      age: userInfo.age,
    });
    setIsEditing(false);
  }, [userInfo]);

  const handleChange = useCallback((key: keyof NewUserInfo, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <ViewContainer Header={<SettingHeader />}>
      <YStack space="$4" mb="$4">
        <H3>{t('settings.profile.title') || 'Profile'}</H3>
        <Separator />
      </YStack>

      <YStack space="$6">
        {/* User ID */}
        <YStack space="$2">
          <Text color="$gray11">{t('settings.profile.id') || 'ID'}</Text>
          <Paragraph>{userInfo.id}</Paragraph>
        </YStack>

        {/* Username */}
        <YStack space="$2">
          <Text color="$gray11">
            {t('settings.profile.username') || 'Username'}
          </Text>
          {isEditing ? (
            <Input
              value={form.userName}
              onChangeText={text => handleChange('userName', text)}
            />
          ) : (
            <Paragraph>{userInfo.userName}</Paragraph>
          )}
        </YStack>

        {/* Email */}
        <YStack space="$2">
          <Text color="$gray11">{t('settings.profile.email') || 'Email'}</Text>
          {isEditing ? (
            <Input
              value={form.email || ''}
              onChangeText={text => handleChange('email', text)}
            />
          ) : (
            <Paragraph>{userInfo.email || '-'}</Paragraph>
          )}
        </YStack>

        {/* Age */}
        <YStack space="$2">
          <Text color="$gray11">{t('settings.profile.age') || 'Age'}</Text>
          {isEditing ? (
            <Input
              value={form.age?.toString() || ''}
              onChangeText={text => handleChange('age', parseInt(text) || null)}
              keyboardType="numeric"
            />
          ) : (
            <Paragraph>{userInfo.age || '-'}</Paragraph>
          )}
        </YStack>

        {/* Days Since Signup */}
        <YStack space="$2">
          <Text color="$gray11">
            {t('settings.profile.daysSinceSignup') || 'Days Since Signup'}
          </Text>
          <Paragraph>{userInfo.daysSinceSignup}</Paragraph>
        </YStack>

        {/* Action Buttons */}
        <YStack space="$4" mt="$4">
          {isEditing ? (
            <XStack space="$4">
              <Button flex={1} onPress={handleCancel} variant="outlined">
                {t('common.cancel') || 'Cancel'}
              </Button>
              <Button flex={1} onPress={handleSave} themeInverse>
                {t('common.save') || 'Save'}
              </Button>
            </XStack>
          ) : (
            <Button onPress={handleEdit}>{t('common.edit') || 'Edit'}</Button>
          )}
        </YStack>
      </YStack>
    </ViewContainer>
  );
}
