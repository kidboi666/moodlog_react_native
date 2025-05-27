import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { H1, H3, H4, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { UserQueries } from '@/queries'
import { useAuth } from '@/store'

function _WelcomeZone() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const { data: userInfo, isPending } = useQuery(
    UserQueries.getUserInfo(session?.user?.id || ''),
  )

  return (
    <Animated.View
      entering={FadeIn.delay(DelayMS.ANIMATION.MEDIUM)}
      style={styles.container}
    >
      <View style={styles.emoji}>
        <H1>{t('common.greeting.hello')}</H1>
        <ShakeEmoji emoji='👋' />
      </View>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <H3>{t('common.greeting.welcome', { name: userInfo?.user_name })}</H3>
      )}
      <H4>{t('common.greeting.howAreYou')}</H4>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  emoji: {
    gap: 8,
    flexDirection: 'row',
  },
})

export const WelcomeZone = memo(_WelcomeZone)
WelcomeZone.displayName = 'WelcomeZone'
