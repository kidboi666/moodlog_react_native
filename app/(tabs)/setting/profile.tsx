import { supabase } from '@/lib/supabase'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import {
  Input,
  Paragraph,
  Separator,
  Text,
  XStack,
  YStack,
  styled,
} from 'tamagui'

import { ProfileMenuItem } from '@/features/setting/components/ProfileMenuItem'
import {
  BaseText,
  H1,
  PressableButton,
  ViewContainer,
} from '@/shared/components'
import { useAuth } from '@/shared/store'
import type { NewUserInfo } from '@/shared/types'
import { DateUtils } from '@/shared/utils'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const [form, setForm] = useState<NewUserInfo>({
    userName: session?.user.user_metadata.user_name ?? '',
    email: session?.user.email ?? '',
    age: session?.user.user_metadata.age ?? null,
    avatarUrl: session?.user.user_metadata.avatar_url ?? '',
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

  useEffect(() => {
    if (session) {
      setForm({
        userName: session.user.user_metadata.user_name,
        email: session.user.email,
        age: session.user.user_metadata.age,
        avatarUrl: session.user.user_metadata.avatar_url,
      })
    }
  }, [session])

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
        <H1>{t('settings.profile.title') || 'Profile'}</H1>
        <Separator />
      </YStack>

      <YStack gap='$6'>
        {/* User ID */}
        <MenuSpacing>
          <MenuTitle>{t('settings.profile.id') || 'ID'}</MenuTitle>
          <BaseText>{session?.user.id}</BaseText>
        </MenuSpacing>

        {/* Username */}
        <ProfileMenuItem
          isEditing={isEditing}
          isLoading={isLoading}
          title='settings.profile.username'
          label='userName'
          onChangeText={text => handleChange('userName', text)}
          value={form.userName}
        />

        {/* Email */}
        <ProfileMenuItem
          isEditing={isEditing}
          isLoading={isLoading}
          title='settings.profile.email'
          label='email'
          onChangeText={text => handleChange('email', text)}
          value={form.email}
        />

        {/* Age */}
        <ProfileMenuItem
          isEditing={isEditing}
          isLoading={isLoading}
          label='age'
          onChangeText={text =>
            handleChange('age', text ? Number.parseInt(text) : null)
          }
          title='settings.profile.age'
          value={form.age}
        />

        {/* Days Since Signup */}
        <MenuSpacing>
          <MenuTitle>{t('settings.profile.daysSinceSignup')}</MenuTitle>
          <BaseText>
            {DateUtils.getDaysSinceSignup(session.user.created_at)}
          </BaseText>
        </MenuSpacing>

        {/* Action Buttons */}
        <YStack gap='$4' mt='$4'>
          {isEditing ? (
            <XStack gap='$4'>
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

const MenuTitle = styled(BaseText, {
  color: '$color11',
})

const MenuSpacing = styled(YStack, {
  gap: '$2',
})
