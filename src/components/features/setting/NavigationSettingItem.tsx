import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { Button, styled } from 'tamagui'

import { BaseText } from '@/components/shared'

interface NavigationSettingItemProps {
  icon?: any
  label: string
  onRouteChange: () => void
}

function _NavigationSettingItem({
  icon,
  label,
  onRouteChange,
}: NavigationSettingItemProps) {
  return (
    <Button
      animation='quick'
      justify='space-between'
      icon={icon}
      onPress={onRouteChange}
    >
      <Title>{label}</Title>
      <ChevronRight size='$1' />
    </Button>
  )
}

const Title = styled(BaseText, {
  defaultFontSize: '$4',
  flex: 1,
})

export const NavigationSettingItem = memo(_NavigationSettingItem)
NavigationSettingItem.displayName = 'NavigationSettingItem'
