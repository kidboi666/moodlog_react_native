import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

import { ProfileMenuItem } from '@/components/features/setting'
import { BaseText, ScreenView } from '@/components/shared'
import { UserQueries } from '@/queries'
import { useAuth } from '@/store'
import type { NewUserInfo } from '@/types'
import { getDaysSinceSignup } from '@/utils'

export default function ProfileScreen() {
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

  return (
    <ScreenView edges={['top']}>
      <View style={styles.container}>
        <Avatar.Image
          size={120}
          source={{ uri: form.avatar_url || '' }}
          style={styles.image}
        />
        <ProfileMenuItem title='settings.profile.id' value={session?.user.id} />
        <ProfileMenuItem
          title='settings.profile.username'
          value={form.user_name}
        />
        <ProfileMenuItem title='settings.profile.email' value={form.email} />
        <ProfileMenuItem title='settings.profile.age' value={form.age} />
        <ProfileMenuItem
          title='settings.profile.daysSinceSignup'
          value={getDaysSinceSignup(session.user.created_at)}
        />
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  image: {
    alignSelf: 'center',
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
