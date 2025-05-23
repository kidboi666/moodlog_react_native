import { useThemedStyles } from '@/hooks'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import {
  ButtonProps,
  IconButtonProps,
  Button as RNPButton,
  IconButton as RNPIconButton,
} from 'react-native-paper'

type RNPButtonProps = ButtonProps & {
  variant?: 'danger' | 'warning' | 'normal' | 'inverse'
}
type RNPIconButtonProps = IconButtonProps
type RNPBackButtonProps = Omit<IconButtonProps, 'icon'> & {
  onPress?: () => void
}

export function Button({
  variant = 'normal',
  children,
  mode,
  style,
  ...props
}: RNPButtonProps) {
  const themedStyles = useThemedStyles(({ tokens, colors }) => ({
    danger: {
      backgroundColor: tokens.semantic.error.main,
    },
    warning: {
      backgroundColor: tokens.semantic.warning.main,
    },
    inverse: {
      backgroundColor: colors.action.pressed,
    },
    normal: {},
  }))
  return (
    <RNPButton
      style={[
        styles.base,
        variant === 'normal' ? themedStyles.normal : undefined,
        variant === 'danger' ? themedStyles.danger : undefined,
        variant === 'warning' ? themedStyles.warning : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNPButton>
  )
}

export function IconButton({ style, ...props }: RNPIconButtonProps) {
  return <RNPIconButton style={[styles.base, style]} {...props} />
}

export function BackButton({ onPress, style, ...props }: RNPBackButtonProps) {
  const router = useRouter()
  const handlePress = () => (onPress ? onPress : router.back())
  return (
    <RNPIconButton
      icon='arrow-left'
      onPress={handlePress}
      style={[styles.base, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
  },
})
