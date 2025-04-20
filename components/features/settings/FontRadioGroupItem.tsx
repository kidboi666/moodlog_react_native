import { PressableButton } from '@/components/shared/PressableButton'
import { GetThemeValueForKey } from 'tamagui'
import * as S from './FontRadioGroupItem.styled'

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
      <S.FontItemLabel fontFamily={computedFontFamily}>{label}</S.FontItemLabel>
      <S.StyledFontGroupItem value={value} id={value}>
        <S.StyledFontGroupIndicator />
      </S.StyledFontGroupItem>
    </PressableButton>
  )
}
