import { useCustomFont } from '@/shared/hooks/useCustomFont'
import { Input, InputProps, View, styled } from 'tamagui'

const StyledView = styled(View, {
  animation: 'quick',
  borderWidth: 1,
  focusStyle: {
    borderColor: '$blue8',
    rounded: 8,
    shadowColor: '$blue8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
})

interface Props extends InputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export const FormInput = ({
  value,
  onChangeText,
  placeholder,
  ...props
}: Props) => {
  const font = useCustomFont()

  return (
    <StyledView>
      <Input
        value={value}
        onChangeText={onChangeText}
        fontFamily={font}
        placeholder={placeholder}
        {...props}
      />
    </StyledView>
  )
}
