import { useQuery } from '@tanstack/react-query'
import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Spinner, XStack } from 'tamagui'

import { Delay, H1, H3, H4, ShakeEmoji } from '@/components/shared'
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
    <Fragment>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
        <XStack gap='$2' items='flex-end'>
          <H1>{t('common.greeting.hello')}</H1>
          <ShakeEmoji emoji='👋' />
        </XStack>
        {isLoading ? (
          <Spinner />
        ) : (
          <H3>{t('common.greeting.welcome', { name: userInfo?.user_name })}</H3>
        )}
      </Delay>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
        <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
      </Delay>
    </Fragment>
  )
}

export const WelcomeZone = memo(_WelcomeZone)
WelcomeZone.displayName = 'WelcomeZone'
