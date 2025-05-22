import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { ProfileAvatar, ProfileMenuItem } from '@/components/features/setting'
import { BaseText, H1, ScreenView } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
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
      <ScreenView>
        <BaseText>사용자 정보를 불러오지 못했습니다.</BaseText>
      </ScreenView>
    )
  }

  const themedStyles = useThemedStyles(({ colors }) => ({
    title: {
      color: colors.text.primary,
    },
  }))
  return (
    <ScreenView>
      <View style={styles.titleBox}>
        <H1>{t('settings.profile.title') || 'Profile'}</H1>
      </View>
      <View style={styles.container}>
        <ProfileAvatar avatarUrl={form.avatar_url || ''} />
        {/* User ID */}
        <View style={styles.menuSpacing}>
          <BaseText style={themedStyles.title}>
            {t('settings.profile.id') || 'ID'}
          </BaseText>
          <BaseText>{session?.user.id}</BaseText>
        </View>
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
        <View style={styles.menuSpacing}>
          <BaseText style={themedStyles.title}>
            {t('settings.profile.daysSinceSignup')}
          </BaseText>
          <BaseText>{getDaysSinceSignup(session.user.created_at)}</BaseText>
        </View>
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  menuSpacing: {
    gap: 4,
  },
  contentBox: {
    marginBottom: 20,
  },
  titleBox: {
    gap: 8,
    marginBottom: 8,
  },
})
