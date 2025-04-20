import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack } from 'tamagui'

import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useAuth } from '@/store'

import { FadeIn } from '@/components/shared/FadeIn'
import { H1, H3, H4 } from '@/components/shared/Heading'
import { ShakeEmoji } from '@/components/shared/ShakeEmoji'

export const WelcomeZone = memo(() => {
  const { t } = useTranslation()
  const { userName } = useAuth()

  return (
    <Fragment>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
        <XStack gap='$2' items='flex-end'>
          <H1>{t('common.greeting.hello')}</H1>
          <ShakeEmoji emoji='👋' />
        </XStack>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </FadeIn>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
        <H4 color='$gray11'>{t('common.greeting.howAreYou')}</H4>
      </FadeIn>
    </Fragment>
  )
})
