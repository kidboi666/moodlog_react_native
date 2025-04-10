import type { Href } from 'expo-router'

import { ChevronRight } from '@tamagui/lucide-icons'
import * as S from './NavigationSettingItem.styled'

interface NavigationSettingItemProps {
  icon?: any
  label: string
  href: Href
  onRouteChange: (href: Href) => void
}

export const NavigationSettingItem = ({
  icon,
  label,
  href,
  onRouteChange,
}: NavigationSettingItemProps) => {
  return (
    <S.SettingsNavigationButton icon={icon} onPress={() => onRouteChange(href)}>
      <S.ItemLabel>{label}</S.ItemLabel>
      <ChevronRight />
    </S.SettingsNavigationButton>
  )
}
