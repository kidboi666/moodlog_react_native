import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useApp, useAuth } from '@/store'
import type { NewUserInfo } from '@/types'
import { getDaysSinceSignup } from '@/utils'

import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/settings/Profile.styled'

export default function Screen() {
  const { t } = useTranslation()
  const { userInfo, onUserInfoChange, isLoading } = useAuth()
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<NewUserInfo>({
    userName: userInfo.userName,
    email: userInfo.email,
    age: userInfo.age,
  })

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleSave = useCallback(async () => {
    if (isLoading) return

    try {
      await onUserInfoChange(form)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }, [form, onUserInfoChange, isLoading])

  const handleCancel = useCallback(() => {
    setForm({
      userName: userInfo.userName,
      email: userInfo.email,
      age: userInfo.age,
    })
    setIsEditing(false)
  }, [userInfo])

  const handleChange = useCallback(
    (key: keyof NewUserInfo, value: string | number | null) => {
      setForm(prev => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

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
          <S.ProfileValue>{userInfo.id}</S.ProfileValue>
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
            <S.ProfileValue>{userInfo.userName}</S.ProfileValue>
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
            <S.ProfileValue>{userInfo.email || '-'}</S.ProfileValue>
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
            <S.ProfileValue>{userInfo.age || '-'}</S.ProfileValue>
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
              {t('common.edit') || 'Edit'}
            </S.EditButton>
          )}
        </S.ButtonContainer>
      </S.ProfileSectionContainer>
    </ViewContainer>
  )
}
