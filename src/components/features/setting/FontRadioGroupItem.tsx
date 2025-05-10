import { Button, GetThemeValueForKey, RadioGroup, styled } from 'tamagui'

import { BaseText } from '@/components/shared'
import { MOUNT_STYLE } from '@/constants'

interface Props {
  value: string
  label: string
  onValueChange: (value: string) => void
}

export function FontRadioGroupItem({ value, label, onValueChange }: Props) {
  const computedFontFamily =
    `$${value}` as unknown as GetThemeValueForKey<'fontFamily'>
  return (
    <Button animation='quick' chromeless onPress={() => onValueChange(value)}>
      <FontItemLabel fontFamily={computedFontFamily}>{label}</FontItemLabel>
      <StyledFontGroupItem value={value} id={value}>
        <StyledFontGroupIndicator />
      </StyledFontGroupItem>
    </Button>
  )
}

const FontItemLabel = styled(BaseText, {
  flex: 1,
})

const StyledFontGroupItem = styled(RadioGroup.Item)

const StyledFontGroupIndicator = styled(RadioGroup.Indicator, {
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
})
