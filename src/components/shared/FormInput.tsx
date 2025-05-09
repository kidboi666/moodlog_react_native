import { Input, InputProps, View, styled } from 'tamagui'

import { useCustomFont } from 'hooks'

interface Props extends InputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export const FormInput = ({
  value,
  onChangeText,
  placeholder = '',
  ...props
}: Props) => {
  const { fontNameWithTokenPrefix } = useCustomFont()

  return (
    <StyledView>
      <Input
        value={value}
        onChangeText={onChangeText}
        fontFamily={fontNameWithTokenPrefix}
        placeholder={placeholder}
        {...props}
      />
    </StyledView>
  )
}

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
