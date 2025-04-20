import { supabase } from '@/lib/supabase'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Alert } from 'react-native'
import { Input, Paragraph, Separator, Text, XStack, YStack } from 'tamagui'

import { H3 } from '@/components/shared/Heading'
import { useApp, useAuth } from '@/store'
import type { NewUserInfo } from '@/types'
import { getDaysSinceSignup } from '@/utils'

import { BaseText } from '@/components/shared/BaseText'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer'

export default function Screen() {
  const { t } = useTranslation()
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const { session } = useAuth()
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
      const { data, error } = await supabase
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

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        const { data, error, status } = await supabase
          .from('profiles')
          .select('user_name, email, age, avatar_url')
          .eq('id', session?.user.id)
          .single()

        if (data) {
          setForm({
            userName: data.user_name,
            email: data.email,
            age: data.age,
            avatarUrl: data.avatar_url,
          })
        }
        console.log(data)
        if (error) {
          throw error
        }
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [session?.user.id])

  if (!firstLaunchDate) return null

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
          <Paragraph>{getDaysSinceSignup(firstLaunchDate)}</Paragraph>
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
