import { useToastController } from '@tamagui/toast'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'tamagui'

import { useApp } from '@/store'
import { SubscriptionTier } from '@/types'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  showToast?: boolean
}

/**
 * 프리미엄 기능을 위한 고차 컴포넌트
 * 사용자가 프리미엄 구독자인 경우에만 기능을 보여주고, 아닌 경우 fallback을 렌더링합니다.
 */
export const PremiumFeature = ({
  children,
  fallback,
  showToast = true,
}: Props) => {
  const subscriptionTier = useApp(state => state.subscriptionTier)
  const toast = useToastController()
  const { t } = useTranslation()

  const isPremium = subscriptionTier === SubscriptionTier.PREMIUM

  useEffect(() => {
    if (!isPremium && showToast) {
      toast.show(t('notifications.premium.title'), {
        message: t('notifications.premium.message'),
        preset: 'notice',
      })
    }
  }, [isPremium, showToast, toast, t])

  return <>{isPremium ? children : fallback || <View />}</>
}
