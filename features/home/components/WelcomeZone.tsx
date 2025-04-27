import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack } from 'tamagui'

import { Delay, H1, H3, H4, ShakeEmoji } from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useAuth } from 'shared/store'

export const WelcomeZone = memo(() => {
  const { t } = useTranslation()
  const { userName } = useAuth()

  return (
    <Fragment>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
        <XStack gap='$2' items='flex-end'>
          <H1>{t('common.greeting.hello')}</H1>
          <ShakeEmoji emoji='👋' />
        </XStack>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </Delay>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
        <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
      </Delay>
    </Fragment>
  )
})
