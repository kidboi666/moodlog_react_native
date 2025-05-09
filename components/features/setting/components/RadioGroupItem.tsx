import { memo } from 'react'
import { Button, RadioGroup } from 'tamagui'

import { BaseText } from '@/components/shared'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'

interface Props {
  value: string
  label: string
  onValueChange: (value: string) => void
}

export const RadioGroupItem = memo(({ value, label, onValueChange }: Props) => {
  return (
    <Button animation='quick' chromeless onPress={() => onValueChange(value)}>
      <BaseText flex={1}>{label}</BaseText>
      <RadioGroup.Item value={value} id={value}>
        <RadioGroup.Indicator
          animation='quick'
          enterStyle={MOUNT_STYLE}
          animateOnly={MOUNT_STYLE_KEY}
        />
      </RadioGroup.Item>
    </Button>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
