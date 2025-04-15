import { GetThemeValueForKey } from 'tamagui'
import * as S from './RadioGroupItem.styled'

interface Props {
  value: string
  label: string
  onValueChange: (value: string) => void
}

export const RadioGroupItem = ({ value, label, onValueChange }: Props) => {
  const computedFontFamily =
    `$${value}` as unknown as GetThemeValueForKey<'fontFamily'>
  return (
    <S.RadioGroupContainerButton onPress={() => onValueChange(value)}>
      <S.RadioItemLabel fontFamily={computedFontFamily}>
        {label}
      </S.RadioItemLabel>
      <S.StyledRadioGroupItem value={value} id={value}>
        <S.StyledRadioGroupIndicator />
      </S.StyledRadioGroupItem>
    </S.RadioGroupContainerButton>
  )
}
