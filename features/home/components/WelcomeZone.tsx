import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack } from 'tamagui'

import { useAuth } from '@/store'
import { ANIMATION_DELAY_MS } from 'shared/constants'

import { AnimatedEntry, H1, H3, H4, ShakeEmoji } from '@/shared/components'

export const WelcomeZone = memo(() => {
  const { t } = useTranslation()
  const { userName } = useAuth()

  return (
    <Fragment>
      <AnimatedEntry delay={ANIMATION_DELAY_MS[0]}>
        <XStack gap='$2' items='flex-end'>
          <H1>{t('common.greeting.hello')}</H1>
          <ShakeEmoji emoji='👋' />
        </XStack>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </AnimatedEntry>
      <AnimatedEntry delay={ANIMATION_DELAY_MS[1]}>
        <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
      </AnimatedEntry>
    </Fragment>
  )
})
