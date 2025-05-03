import { Button, ButtonProps, Spinner } from 'tamagui'

import {
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/shared/constants/animations'
import { useCustomFont } from 'shared/hooks'

interface Props extends ButtonProps {
  loading?: boolean
}

/**
 * !important - 스타일링을 styled로 적용할 경우 안드로이드에서 터치 피드백 사운드가 부담스러워짐.
 */
export const PressableButton = ({
  children,
  loading,
  bg,
  color,
  animation,
  pressStyle,
  enterStyle,
  exitStyle,
  scaleIcon,
  fontFamily,
  disabled,
  themeInverse,
  chromeless,
  ...props
}: Props) => {
  const { fontNameWithTokenPrefix } = useCustomFont()
  const animateOnly =
    enterStyle || exitStyle
      ? [...PRESS_STYLE_KEY, ...MOUNT_STYLE_KEY]
      : undefined
  const isDisabled = disabled || loading
  return (
    <Button
      bg={bg || '$backgroundHover'}
      color={color || '$color11'}
      animation={animation || 'quick'}
      pressStyle={pressStyle || PRESS_STYLE}
      enterStyle={enterStyle}
      exitStyle={exitStyle}
      animateOnly={animateOnly || PRESS_STYLE_KEY}
      scaleIcon={scaleIcon || 1.5}
      fontFamily={fontFamily || fontNameWithTokenPrefix}
      themeInverse={themeInverse}
      opacity={isDisabled ? 0.4 : 1}
      disabled={isDisabled}
      chromeless={chromeless}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </Button>
  )
}

PressableButton.displayName = 'PressableButton'
