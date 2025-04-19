import { useCustomFont } from '@/hooks'
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations'
import { Button, ButtonProps } from 'tamagui'

interface Props extends ButtonProps {}

export const PressableButton = ({ children, disabled, ...props }: Props) => {
  const font = useCustomFont()
  return (
    <Button
      bg='$backgroundHover'
      animation='quick'
      pressStyle={PRESS_STYLE}
      animateOnly={PRESS_STYLE_KEY}
      scaleIcon={1.5}
      fontFamily={font}
      disabled={disabled}
      opacity={disabled ? 0.5 : 1}
      {...props}
    >
      {children}
    </Button>
  )
}
