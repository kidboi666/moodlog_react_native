import { ChevronRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { Button, styled } from 'tamagui'

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
        <Title>{label}</Title>
        <ChevronRight size='$1' />
      </Button>
    )
  },
)

const Title = styled(BaseText, {
  flex: 1,
})

NavigationSettingItem.displayName = 'NavigationSettingItem'
