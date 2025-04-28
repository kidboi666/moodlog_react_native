import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { Button } from 'tamagui'

import { BaseText } from '@/shared/components'

interface NavigationSettingItemProps {
  icon?: any
  label: string
  onRouteChange: () => void
}

export const NavigationSettingItem = memo(
  ({ icon, label, onRouteChange }: NavigationSettingItemProps) => {
    return (
      <Button
        animation='quick'
        justify='space-between'
        icon={icon}
        onPress={onRouteChange}
      >
        <BaseText flex={1}>{label}</BaseText>
        <ChevronRight size='$1' />
      </Button>
    )
  },
)

NavigationSettingItem.displayName = 'NavigationSettingItem'
