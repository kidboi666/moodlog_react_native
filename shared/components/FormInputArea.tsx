import { InputProps, TextArea, View, styled } from 'tamagui'

import { useCustomFont } from '@/shared/hooks'

interface Props extends InputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export const FormInputArea = ({
  value,
  onChangeText,
  placeholder,
  height = 200,
  ...props
}: Props) => {
  const { fontNameWithTokenPrefix } = useCustomFont()

  return (
    <StyledView>
      <TextArea
        value={value}
        onChangeText={onChangeText}
        fontFamily={fontNameWithTokenPrefix}
        placeholder={placeholder}
        height={height}
        {...props}
      />
    </StyledView>
  )
}

const StyledView = styled(View, {
  animation: 'quick',
  borderWidth: 1,
  verticalAlign: 'top',
  flex: 1,

  focusStyle: {
    borderColor: '$blue8',
    rounded: 8,
    shadowColor: '$blue8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
})
