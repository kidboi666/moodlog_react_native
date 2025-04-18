import { styled } from 'tamagui'

import { PressableButton } from '@/components/shared/PressableButton.styled'

export const MoodLevelButton = styled(PressableButton, {
  size: '$5',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  },
})
