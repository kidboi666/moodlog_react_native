import { useCustomFont } from '@/core/hooks/useCustomFont'
import * as S from './RadioGroupItem.styled'

interface Props {
  value: string
  label: string
  onValueChange: (value: string) => void
}

export const RadioGroupItem = ({ value, label, onValueChange }: Props) => {
  const font = useCustomFont()
  return (
    <S.RadioGroupContainerButton onPress={() => onValueChange(value)}>
      <S.RadioItemLabel fontFamily={font}>{label}</S.RadioItemLabel>
      <S.StyledRadioGroupItem value={value} id={value}>
        <S.StyledRadioGroupIndicator />
      </S.StyledRadioGroupItem>
    </S.RadioGroupContainerButton>
  )
}
