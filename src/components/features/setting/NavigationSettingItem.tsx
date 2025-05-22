import { memo } from 'react'
import { Button } from 'react-native-paper'

interface NavigationSettingItemProps {
  icon?: string
  label: string
  onRouteChange: () => void
}

function _NavigationSettingItem({
  icon,
  label,
  onRouteChange,
}: NavigationSettingItemProps) {
  return (
    <Button mode='text' icon={icon} onPress={onRouteChange}>
      {label}
    </Button>
  )
}

export const NavigationSettingItem = memo(_NavigationSettingItem)
NavigationSettingItem.displayName = 'NavigationSettingItem'
