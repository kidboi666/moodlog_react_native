import { supabase } from '@/lib/supabase'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Alert } from 'react-native'

import { useApp, useAuth, useUI } from '@/store'
import type { NewUserInfo } from '@/types'
import { getDaysSinceSignup } from '@/utils'

import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { BaseText } from '@/components/shared/BaseText'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/settings/Profile.styled'

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
      await handleUserInfoChange(form)
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
    <ViewContainer Header={<SettingHeader />}>
      <S.ProfileContainer>
        <S.SectionTitle>
          {t('settings.profile.title') || 'Profile'}
        </S.SectionTitle>
        <S.ProfileDivider />
      </S.ProfileContainer>

      <S.ProfileSectionContainer>
        {/* User ID */}
        <S.ProfileItemContainer>
          <S.ProfileLabel>{t('settings.profile.id') || 'ID'}</S.ProfileLabel>
          <S.ProfileValue>{session?.user.id}</S.ProfileValue>
        </S.ProfileItemContainer>

        {/* Username */}
        <S.ProfileItemContainer>
          <S.ProfileLabel>
            {t('settings.profile.username') || 'Username'}
          </S.ProfileLabel>
          {isEditing ? (
            <S.ProfileInput
              value={form.userName}
              onChangeText={text => handleChange('userName', text)}
              disabled={isLoading}
            />
          ) : (
            <S.ProfileValue>{form.userName}</S.ProfileValue>
          )}
        </S.ProfileItemContainer>

        {/* Email */}
        <S.ProfileItemContainer>
          <S.ProfileLabel>
            {t('settings.profile.email') || 'Email'}
          </S.ProfileLabel>
          {isEditing ? (
            <S.ProfileInput
              value={form.email || ''}
              onChangeText={text => handleChange('email', text)}
              disabled={isLoading}
            />
          ) : (
            <S.ProfileValue>{form.email || '-'}</S.ProfileValue>
          )}
        </S.ProfileItemContainer>

        {/* Age */}
        <S.ProfileItemContainer>
          <S.ProfileLabel>{t('settings.profile.age') || 'Age'}</S.ProfileLabel>
          {isEditing ? (
            <S.ProfileInput
              value={form.age?.toString() || ''}
              onChangeText={text =>
                handleChange('age', text ? Number.parseInt(text) : null)
              }
              keyboardType='numeric'
              disabled={isLoading}
            />
          ) : (
            <S.ProfileValue>{form.age || '-'}</S.ProfileValue>
          )}
        </S.ProfileItemContainer>

        {/* Days Since Signup */}
        <S.ProfileItemContainer>
          <S.ProfileLabel>
            {t('settings.profile.daysSinceSignup') || 'Days Since Signup'}
          </S.ProfileLabel>
          <S.ProfileValue>{getDaysSinceSignup(firstLaunchDate)}</S.ProfileValue>
        </S.ProfileItemContainer>

        {/* Action Buttons */}
        <S.ButtonContainer>
          {isEditing ? (
            <S.ActionButtonsContainer>
              <S.CancelButton onPress={handleCancel} disabled={isLoading}>
                {t('common.cancel') || 'Cancel'}
              </S.CancelButton>
              <S.SaveButton onPress={handleSave} disabled={isLoading}>
                {t('common.save') || 'Save'}
              </S.SaveButton>
            </S.ActionButtonsContainer>
          ) : (
            <S.EditButton onPress={handleEdit} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size='small' />
              ) : (
                <BaseText>{t('common.edit') || 'Edit'}</BaseText>
              )}
            </S.EditButton>
          )}
        </S.ButtonContainer>
      </S.ProfileSectionContainer>
    </ViewContainer>
  )
}
