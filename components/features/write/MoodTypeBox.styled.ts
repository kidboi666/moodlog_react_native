import { View, YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { PressableButton } from '@/components/shared/PressableButton.styled'

export const MoodTypeContainer = styled(YStack, {
  gap: '$4',
  items: 'center',
})

export const MoodLevelContainer = styled(YStack, {
  gap: '$4',
})

export const SelectedMoodBox = styled(View)

export const SelectedMoodText = styled(BaseText, {
  fontSize: '$4',
  color: '$gray11',
  fontWeight: '400',
})
