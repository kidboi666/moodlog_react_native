import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Separator, YStack, styled } from 'tamagui'

import { ProfileMenuItem } from '@/components/features/setting'
import { BaseText, H1, ViewContainer } from '@/components/shared'
import { UserQueries } from '@/queries'
import { useAuth } from '@/store'
import type { NewUserInfo } from '@/types'
import { getDaysSinceSignup } from '@/utils'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const { data: userInfo } = useQuery(
    UserQueries.getUserInfo(session?.user.id ?? ''),
  )

  const [form, setForm] = useState<NewUserInfo>({
    user_name: null,
    email: null,
    age: null,
    avatar_url: null,
  })

  useEffect(() => {
    if (userInfo) {
      setForm({
        user_name: userInfo.user_name,
        email: userInfo.email,
        age: userInfo.age,
        avatar_url: userInfo.avatar_url,
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
        <Avatar circular size='$10'>
          <Avatar.Image
            source={{ uri: form.avatar_url || '', width: 300, height: 300 }}
          />
          <Avatar.Fallback />
        </Avatar>
        {/* User ID */}
        <MenuSpacing>
          <MenuTitle>{t('settings.profile.id') || 'ID'}</MenuTitle>
          <BaseText>{session?.user.id}</BaseText>
        </MenuSpacing>

        {/* Username */}
        <ProfileMenuItem
          title='settings.profile.username'
          value={form.user_name}
        />

        {/* Email */}
        <ProfileMenuItem title='settings.profile.email' value={form.email} />

        {/* Age */}
        <ProfileMenuItem title='settings.profile.age' value={form.age} />

        {/* Days Since Signup */}
        <MenuSpacing>
          <MenuTitle>{t('settings.profile.daysSinceSignup')}</MenuTitle>
          <BaseText>{getDaysSinceSignup(session.user.created_at)}</BaseText>
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
