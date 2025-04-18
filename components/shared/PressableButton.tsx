import { memo } from 'react'
import { ButtonProps } from 'tamagui'

import { BaseText } from './BaseText'
import * as S from './PressableButton.styled'

interface Props extends ButtonProps {}

export const PressableButton = memo(
  S.PressableButton.styleable<Props>(
    ({ children, color, themeInverse, ...props }, ref) => {
      return (
        <S.PressableButton themeInverse={themeInverse} ref={ref} {...props}>
          <BaseText color={color} themeInverse={themeInverse}>
            {children}
          </BaseText>
        </S.PressableButton>
      )
    },
  ),
)
