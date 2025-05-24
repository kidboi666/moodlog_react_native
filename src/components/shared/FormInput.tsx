import {
  HelperText,
  TextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper'

interface Props extends TextInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  errorMessage?: string
}

export function FormInput({
  mode = 'outlined',
  value,
  onChangeText,
  placeholder = '',
  label,
  error,
  errorMessage,
  outlineColor,
  activeOutlineColor,
  style,
  ...props
}: Props) {
  const theme = useTheme()

  return (
    <>
      <TextInput
        mode={mode}
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        placeholder={placeholder}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        style={[{ backgroundColor: theme.colors.background }, style]}
        {...props}
      />
      <HelperText type='error' visible={error}>
        {errorMessage}
      </HelperText>
    </>
  )
}
