import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingHeader } from '@/core/components/features/settings/SettingHeader'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { useUser } from '@/core/store/user.store'
import * as S from '@/styles/screens/settings/Profile.styled'
import type { NewUserInfo } from '@/types/user.types'

export default function Screen() {
  const { t } = useTranslation()
  const userInfo = useUser(state => state.userInfo)
  const onUserInfoChange = useUser(state => state.onUserInfoChange)
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
    await onUserInfoChange(form)
    setIsEditing(false)
  }, [form, onUserInfoChange])

  const handleCancel = useCallback(() => {
    setForm({
      userName: userInfo.userName,
      email: userInfo.email,
      age: userInfo.age,
    })
    setIsEditing(false)
  }, [userInfo])

  const handleChange = useCallback((key: keyof NewUserInfo, value: any) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }))
  }, [])

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
                handleChange('age', Number.parseInt(text) || null)
              }
              keyboardType='numeric'
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
          <S.ProfileValue>{userInfo.daysSinceSignup}</S.ProfileValue>
        </S.ProfileItemContainer>

        {/* Action Buttons */}
        <S.ButtonContainer>
          {isEditing ? (
            <S.ActionButtonsContainer>
              <S.CancelButton onPress={handleCancel}>
                {t('common.cancel') || 'Cancel'}
              </S.CancelButton>
              <S.SaveButton onPress={handleSave}>
                {t('common.save') || 'Save'}
              </S.SaveButton>
            </S.ActionButtonsContainer>
          ) : (
            <S.EditButton onPress={handleEdit}>
              {t('common.edit') || 'Edit'}
            </S.EditButton>
          )}
        </S.ButtonContainer>
      </S.ProfileSectionContainer>
    </ViewContainer>
  )
}
