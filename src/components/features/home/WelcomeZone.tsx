import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Spinner, XStack } from 'tamagui'

import { H1, H3, H4, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { UserQueries } from '@/queries'
import { useAuth } from '@/store'

function _WelcomeZone() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const { data: userInfo, isLoading } = useQuery(
    UserQueries.getUserInfo(session?.user?.id || ''),
  )

  return (
    <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.MEDIUM[0])}>
      <XStack gap='$2' items='flex-end'>
        <H1>{t('common.greeting.hello')}</H1>
        <ShakeEmoji emoji='👋' />
      </XStack>
      {isLoading ? (
        <Spinner />
      ) : (
        <H3>{t('common.greeting.welcome', { name: userInfo?.user_name })}</H3>
      )}
      <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
    </Animated.View>
  )
}

export const WelcomeZone = memo(_WelcomeZone)
WelcomeZone.displayName = 'WelcomeZone'
