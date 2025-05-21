import { StyleSheet } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'

import { Colors } from '@/constants'

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
  outlineColor = Colors.gray8,
  activeOutlineColor = Colors.gray11,
  style,
  ...props
}: Props) {
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
      style={[styles.input, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.gray4,
  },
})
