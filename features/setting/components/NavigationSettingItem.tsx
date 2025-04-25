import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { Button } from 'tamagui'

import { BaseText } from '@/shared/components'
import { PRESS_STYLE } from '@/shared/constants'

interface NavigationSettingItemProps {
  icon?: any
  label: string
  onRouteChange: () => void
}

export const NavigationSettingItem = memo(
  ({ icon, label, onRouteChange }: NavigationSettingItemProps) => {
    return (
      <Button
        justify='space-between'
        animation='quick'
        pressStyle={PRESS_STYLE}
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
