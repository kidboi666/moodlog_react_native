import { Fragment, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ANIMATION_DELAY_SECONDS } from '@/constants'

import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { H3 } from '@/components/shared/Heading'
import { ShakeEmoji } from '@/components/shared/ShakeEmoji'
import { useAuth } from '@/store'
import * as S from '@/styles/screens/home/Home.styled'
import { Session } from '@supabase/supabase-js'

export const WelcomeZone = memo(() => {
  const { t } = useTranslation()
  const { userName } = useAuth()

  return (
    <Fragment>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
        <S.WelcomeEmojiBox>
          <S.WelcomeTitleText>{t('common.greeting.hello')}</S.WelcomeTitleText>
          <ShakeEmoji emoji='👋' />
        </S.WelcomeEmojiBox>
        <H3>{t('common.greeting.welcome', { name: userName })}</H3>
      </FadeIn>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
        <S.HowAreYouText>{t('common.greeting.howAreYou')}</S.HowAreYouText>
      </FadeIn>
    </Fragment>
  )
})
