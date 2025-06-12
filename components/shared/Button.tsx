import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import {
  ButtonProps,
  IconButtonProps,
  Button as RNPButton,
  IconButton as RNPIconButton,
} from 'react-native-paper'

type Variant = 'danger' | 'warning' | 'normal' | 'inverse'
type Size = 'sm' | 'md' | 'lg'
type RNPButtonProps = ButtonProps & { variant?: Variant; size?: Size }
type RNPIconButtonProps = IconButtonProps & { variant?: Variant }
type RNPBackButtonProps = Omit<IconButtonProps, 'icon'> & {
  onPress?: () => void
}

export function Button({
  variant = 'normal',
  children,
  mode = 'contained',
  style,
  ...props
}: RNPButtonProps) {
  return (
    <RNPButton
      mode={mode}
      size={40}
      style={[baseStyles.frame, style]}
      labelStyle={baseStyles.label}
      {...props}
    >
      {children}
    </RNPButton>
  )
}

export function IconButton({
  style,
  mode,
  size = 40,
  ...props
}: RNPIconButtonProps) {
  return <RNPIconButton mode={mode} size={size} style={[style]} {...props} />
}

export function BackButton({ onPress, style, ...props }: RNPBackButtonProps) {
  const router = useRouter()
  const handlePress = () => (onPress ? onPress : router.back())
  return (
    <RNPIconButton
      icon='arrow-left'
      onPress={handlePress}
      style={[baseStyles.frame, style]}
      {...props}
    />
  )
}

const baseStyles = StyleSheet.create({
  frame: {
    borderRadius: 8,
  },
  label: {
    fontWeight: 'semibold',
  },
})
