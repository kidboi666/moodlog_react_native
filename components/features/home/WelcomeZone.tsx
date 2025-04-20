import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack } from 'tamagui'

import { ANIMATION_DELAY_MS } from '@/constants'
import { useAuth } from '@/store'

import { AnimateMount, H1, H3, H4, ShakeEmoji } from '@/components/shared'

export const WelcomeZone = memo(() => {
  const { t } = useTranslation()
  const { userName } = useAuth()

  return (
    <Fragment>
      <AnimateMount delay={ANIMATION_DELAY_MS[0]}>
        <XStack gap='$2' items='flex-end'>
          <H1>{t('common.greeting.hello')}</H1>
          <ShakeEmoji emoji='👋' />
        </XStack>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </AnimateMount>
      <AnimateMount delay={ANIMATION_DELAY_MS[1]}>
        <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
      </AnimateMount>
    </Fragment>
  )
})
