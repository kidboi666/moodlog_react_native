import { Button, Separator as TamaguiSeparator, XGroup, styled } from 'tamagui'
import { PressableButton } from '../../shared/PressableButton'

export const XGroupContainer = styled(XGroup)

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
})

export const BaseButton = styled(PressableButton, {
  animateOnly: ['backgroundColor', 'opacity', 'borderColor'],
  scaleIcon: 1.5,
})

export const ActionButton = styled(BaseButton)

export const SubmitButton = styled(BaseButton, {
  opacity: 1,

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
})
