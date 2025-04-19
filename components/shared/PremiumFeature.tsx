import { useToastController } from '@tamagui/toast'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'tamagui'

import { useApp } from '@/store'
import { SubscriptionTier } from '@/types'

interface PremiumFeatureProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  showToast?: boolean
}

/**
 * 프리미엄 기능을 위한 고차 컴포넌트
 * 사용자가 프리미엄 구독자인 경우에만 기능을 보여주고, 아닌 경우 fallback을 렌더링합니다.
 */
export const PremiumFeature: React.FC<PremiumFeatureProps> = ({
  children,
  fallback,
  showToast = true,
}) => {
  const { settings } = useApp()
  const toast = useToastController()
  const { t } = useTranslation()

  // 사용자가 프리미엄 구독자인지 확인
  const isPremium = settings.subscriptionTier === SubscriptionTier.PREMIUM

  // 프리미엄 사용자가 아니고 토스트를 보여줘야 하는 경우
  React.useEffect(() => {
    if (!isPremium && showToast) {
      toast.show('프리미엄 기능', {
        message: '이 기능은 프리미엄 회원만 사용할 수 있습니다.',
        preset: 'notice',
      })
    }
  }, [isPremium, showToast, toast])

  // 프리미엄 사용자이면 children을 렌더링, 아니면 fallback을 렌더링
  return <>{isPremium ? children : fallback || <View />}</>
}
