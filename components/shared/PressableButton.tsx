import { useCustomFont } from '@/hooks'
import {
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/styles/animations'
import { memo } from 'react'
import { Button, ButtonProps } from 'tamagui'

interface Props extends ButtonProps {}

export const PressableButton = memo(
  ({ children, disabled, ...props }: Props) => {
    const font = useCustomFont()
    return (
      <Button
        bg='$backgroundHover'
        animation='quick'
        pressStyle={PRESS_STYLE}
        enterStyle={MOUNT_STYLE}
        exitStyle={MOUNT_STYLE}
        animateOnly={[...PRESS_STYLE_KEY, ...MOUNT_STYLE_KEY]}
        scaleIcon={1.5}
        fontFamily={font}
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
        {...props}
      >
        {children}
      </Button>
    )
  },
)
