import { ButtonProps } from 'tamagui'
import { BaseText } from './BaseText'
import * as S from './PressableButton.styled'

interface Props extends ButtonProps {}

export const PressableButton = S.PressableButton.styleable<Props>(
  ({ children, ...props }, ref) => {
    const { color = '$color11' } = props

    return (
      <S.PressableButton
        $platform-android={{
          android_ripple: {
            color: '$color11',
          },
        }}
        {...props}
        ref={ref}
      >
        <BaseText color={color}>{children}</BaseText>
      </S.PressableButton>
    )
  },
)
