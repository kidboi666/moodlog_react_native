import { BaseText } from '@/components/shared'
import { PressableButton } from '@/components/shared/PressableButton'
import { MOUNT_STYLE } from '@/constants'
import { GetThemeValueForKey, RadioGroup, styled } from 'tamagui'

const FontItemLabel = styled(BaseText, {
  flex: 1,
})

const StyledFontGroupItem = styled(RadioGroup.Item)

const StyledFontGroupIndicator = styled(RadioGroup.Indicator, {
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
})

interface Props {
  value: string
  label: string
  onValueChange: (value: string) => void
}

export const FontRadioGroupItem = ({ value, label, onValueChange }: Props) => {
  const computedFontFamily =
    `$${value}` as unknown as GetThemeValueForKey<'fontFamily'>
  return (
    <PressableButton onPress={() => onValueChange(value)}>
      <FontItemLabel fontFamily={computedFontFamily}>{label}</FontItemLabel>
      <StyledFontGroupItem value={value} id={value}>
        <StyledFontGroupIndicator />
      </StyledFontGroupItem>
    </PressableButton>
  )
}
