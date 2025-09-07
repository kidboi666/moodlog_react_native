import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import { H1, H3, H4, ShakeEmoji } from '@/src/components/shared'
import { DelayMS } from '@/src/constants'
import { useApp } from '@/src/store'

function _WelcomeZone() {
  const { t } = useTranslation()
  const userName = useApp(state => state.userName)

  return (
    <Animated.View
      entering={FadeIn.delay(DelayMS.ANIMATION.MEDIUM)}
      style={styles.container}
    >
      <View style={styles.emoji}>
        <H1>{t('common.greeting.hello')}</H1>
        <ShakeEmoji emoji='👋' />
      </View>
      <H3>{t('common.greeting.welcome', { name: userName })}</H3>
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
