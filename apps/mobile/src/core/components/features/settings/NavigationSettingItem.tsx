import type { Href } from 'expo-router'
import { memo } from 'react'

import { ChevronRight } from '@tamagui/lucide-icons'
import * as S from './NavigationSettingItem.styled'

interface NavigationSettingItemProps {
  icon?: any
  label: string
  href: Href
  onRouteChange: (href: Href) => void
}

export const NavigationSettingItem = memo(
  ({ icon, label, href, onRouteChange }: NavigationSettingItemProps) => {
    return (
      <S.SettingsNavigationButton
        icon={icon}
        onPress={() => onRouteChange(href)}
      >
        <S.ItemLabel>{label}</S.ItemLabel>
        <ChevronRight size='$1' />
      </S.SettingsNavigationButton>
    )
  },
)
