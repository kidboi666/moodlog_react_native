import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Separator, YStack, styled } from 'tamagui'

import { ProfileMenuItem } from '@/features/setting/components'
import { BaseText, H1, ViewContainer } from '@/shared/components'
import { useAuth } from '@/shared/store'
import type { NewUserInfo } from '@/shared/types'
import { DateUtils } from '@/shared/utils'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)

  const [form, setForm] = useState<NewUserInfo>({
    userName: session?.user.user_metadata.user_name ?? '',
    email: session?.user.email ?? '',
    age: session?.user.user_metadata.age ?? null,
    avatarUrl: session?.user.user_metadata.avatar_url ?? '',
  })

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
      <TitleBox>
        <H1>{t('settings.profile.title') || 'Profile'}</H1>
        <Separator />
      </TitleBox>

      <ContentContainer>
        {/* User ID */}
        <MenuSpacing>
          <MenuTitle>{t('settings.profile.id') || 'ID'}</MenuTitle>
          <BaseText>{session?.user.id}</BaseText>
        </MenuSpacing>

        {/* Username */}
        <ProfileMenuItem
          title='settings.profile.username'
          value={form.userName}
        />

        {/* Email */}
        <ProfileMenuItem title='settings.profile.email' value={form.email} />

        {/* Age */}
        <ProfileMenuItem title='settings.profile.age' value={form.age} />

        {/* Days Since Signup */}
        <MenuSpacing>
          <MenuTitle>{t('settings.profile.daysSinceSignup')}</MenuTitle>
          <BaseText>
            {DateUtils.getDaysSinceSignup(session.user.created_at)}
          </BaseText>
        </MenuSpacing>
      </ContentContainer>
    </ViewContainer>
  )
}

const MenuTitle = styled(BaseText, {
  color: '$color11',
})

const MenuSpacing = styled(YStack, {
  gap: '$2',
})

const TitleBox = styled(YStack, {
  gap: '$4',
  mb: '$4',
})

const ContentContainer = styled(YStack, {
  gap: '$6',
})
