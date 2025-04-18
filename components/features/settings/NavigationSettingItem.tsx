import { ChevronRight } from '@tamagui/lucide-icons'
import type { Href } from 'expo-router'
import { memo } from 'react'

import { BaseText } from '@/components/shared/BaseText'
import { PRESS_STYLE } from '@/styles/animations'
import { Button } from 'tamagui'

interface NavigationSettingItemProps {
  icon?: any
  label: string
  href: Href
  onRouteChange: (href: Href) => void
}

export const NavigationSettingItem = memo(
  ({ icon, label, href, onRouteChange }: NavigationSettingItemProps) => {
    return (
      <Button
        animation='quick'
        pressStyle={PRESS_STYLE}
        icon={icon}
        onPress={() => onRouteChange(href)}
      >
        <BaseText>{label}</BaseText>
        <ChevronRight size='$1' />
      </Button>
    )
  },
)
