import { View } from 'react-native'
import { TextInput, TextInputProps, useTheme } from 'react-native-paper'

interface Props extends TextInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export function FormInputArea({
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
  const theme = useTheme()

  return (
    <View>
      <TextInput
        mode={mode}
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        placeholder={placeholder}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        multiline
        style={[{ backgroundColor: theme.colors.background }, style]}
        {...props}
      />
    </View>
  )
}
