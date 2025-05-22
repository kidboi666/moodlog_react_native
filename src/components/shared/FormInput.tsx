import { useThemedStyles } from '@/hooks'
import { StyleSheet } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'

interface Props extends TextInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export function FormInput({
  mode = 'outlined',
  value,
  onChangeText,
  placeholder = '',
  label,
  error,
  outlineColor,
  activeOutlineColor,
  style,
  ...props
}: Props) {
  const themedStyles = useThemedStyles(({ colors }) => ({
    input: {
      backgroundColor: colors.background.primary,
    },
  }))
  return (
    <TextInput
      mode={mode}
      label={label}
      value={value}
      onChangeText={onChangeText}
      error={!!error}
      placeholder={placeholder}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      style={[themedStyles.input, style]}
      {...props}
    />
  )
}
