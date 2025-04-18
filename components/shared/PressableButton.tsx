import { useCustomFont } from '@/hooks'
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/styles/animations'
import { Button, ButtonProps, styled } from 'tamagui'

const StyledButton = styled(Button, {
  scaleIcon: 1.5,
  bg: '$backgroundHover',
  animation: 'quick',
  pressStyle: PRESS_STYLE,
  animateOnly: PRESS_STYLE_KEY,
  opacity: 1,

  variants: {
    disabled: {
      true: {
        opacity: 0.4,
      },
    },
  } as const,
})

interface Props extends ButtonProps {}

export const PressableButton = StyledButton.styleable<Props>(
  ({ children, ...props }, ref) => {
    const font = useCustomFont()
    return (
      <StyledButton ref={ref} fontFamily={font} {...props}>
        {children}
      </StyledButton>
    )
  },
)
