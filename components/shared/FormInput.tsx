import { useCustomFont } from '@/hooks/useCustomFont'
import { Input, InputProps } from 'tamagui'

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
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      fontFamily={font}
      borderWidth={1}
      focusStyle={{
        borderWidth: 2,
      }}
      {...props}
    />
  )
}
