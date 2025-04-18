import { Separator as TamaguiSeparator, XGroup, styled } from 'tamagui'

import { PressableButton } from '@/components/shared/PressableButton'

export const XGroupContainer = styled(XGroup)

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
})

export const BaseButton = styled(PressableButton, {
  animateOnly: ['backgroundColor', 'opacity', 'borderColor'],
  scaleIcon: 1.5,
})

export const ActionButton = styled(BaseButton)

export const SubmitButton = styled(BaseButton)
