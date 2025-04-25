import { supabase } from '@/lib/supabase'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { Input, Paragraph, Separator, Text, XStack, YStack } from 'tamagui'

import {
  BaseText,
  H3,
  PressableButton,
  ViewContainer,
} from '@/shared/components'
import { useAuth } from '@/shared/store'
import type { NewUserInfo } from '@/shared/types'
import { getDaysSinceSignup } from '@/shared/utils'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [form, setForm] = useState<NewUserInfo>({
    userName: '',
    email: '',
    age: null,
    avatarUrl: '',
  })
  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleUserInfoChange = useCallback(async () => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('profiles')
        .update({
          userName: form.userName,
          email: form.email,
          age: form.age,
        })
        .eq('id', session?.user.id)
        .select()
        .single()

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setLoading(false)
    }
  }, [form, session?.user.id, setLoading])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
  }, [])

  const handleSave = useCallback(async () => {
    try {
      await handleUserInfoChange()
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }, [form, handleUserInfoChange, setIsEditing])

  const handleChange = useCallback(
    (key: keyof NewUserInfo, value: string | number | null) => {
      setForm(prev => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  if (!session) {
    return (
      <ViewContainer>
        <BaseText>사용자 정보를 불러오지 못했습니다.</BaseText>
      </ViewContainer>
    )
  }

  return (
    <ViewContainer>
      <YStack gap='$4' mb='$4'>
        <H3>{t('settings.profile.title') || 'Profile'}</H3>
        <Separator />
      </YStack>

      <YStack gap='$6'>
        {/* User ID */}
        <YStack gap='$2'>
          <Text color='$gray11'>{t('settings.profile.id') || 'ID'}</Text>
          <Paragraph>{session?.user.id}</Paragraph>
        </YStack>

        {/* Username */}
        <YStack gap='$2'>
          <Text color='$gray11'>
            {t('settings.profile.username') || 'Username'}
          </Text>
          {isEditing ? (
            <Input
              value={form.userName}
              onChangeText={text => handleChange('userName', text)}
              disabled={isLoading}
            />
          ) : (
            <Paragraph>{form.userName}</Paragraph>
          )}
        </YStack>

        {/* Email */}
        <YStack gap='$2'>
          <Text color='$gray11'>{t('settings.profile.email') || 'Email'}</Text>
          {isEditing ? (
            <Input
              value={form.email || ''}
              onChangeText={text => handleChange('email', text)}
              disabled={isLoading}
            />
          ) : (
            <Paragraph>{form.email || '-'}</Paragraph>
          )}
        </YStack>

        {/* Age */}
        <YStack gap='$2'>
          <Text color='$gray11'>{t('settings.profile.age') || 'Age'}</Text>
          {isEditing ? (
            <Input
              value={form.age?.toString() || ''}
              onChangeText={text =>
                handleChange('age', text ? Number.parseInt(text) : null)
              }
              keyboardType='numeric'
              disabled={isLoading}
            />
          ) : (
            <Paragraph>{form.age || '-'}</Paragraph>
          )}
        </YStack>

        {/* Days Since Signup */}
        <YStack gap='$2'>
          <Text color='$gray11'>
            {t('settings.profile.daysSinceSignup') || 'Days Since Signup'}
          </Text>
          <Paragraph>{getDaysSinceSignup(session.user.created_at)}</Paragraph>
        </YStack>

        {/* Action Buttons */}
        <YStack space='$4' mt='$4'>
          {isEditing ? (
            <XStack space='$4'>
              <PressableButton
                flex={1}
                variant='outlined'
                onPress={handleCancel}
                disabled={isLoading}
              >
                {t('common.cancel') || 'Cancel'}
              </PressableButton>
              <PressableButton
                flex={1}
                themeInverse
                onPress={handleSave}
                disabled={isLoading}
              >
                {t('common.save') || 'Save'}
              </PressableButton>
            </XStack>
          ) : (
            <PressableButton onPress={handleEdit} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size='small' />
              ) : (
                <BaseText>{t('common.edit') || 'Edit'}</BaseText>
              )}
            </PressableButton>
          )}
        </YStack>
      </YStack>
    </ViewContainer>
  )
}
