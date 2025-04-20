import { memo } from 'react'
import { RadioGroup } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { PressableButton } from '@/components/shared/PressableButton'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants/animations'

interface Props {
  value: string
  label: string
  onValueChange: (value: string) => void
}

export const RadioGroupItem = memo(({ value, label, onValueChange }: Props) => {
  return (
    <PressableButton onPress={() => onValueChange(value)}>
      <BaseText flex={1}>{label}</BaseText>
      <RadioGroup.Item value={value} id={value}>
        <RadioGroup.Indicator
          animation='quick'
          enterStyle={MOUNT_STYLE}
          animateOnly={MOUNT_STYLE_KEY}
        />
      </RadioGroup.Item>
    </PressableButton>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
