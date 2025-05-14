import { Maybe } from '@/types'
import { memo } from 'react'
import { View, styled } from 'tamagui'

interface Props {
  moodColor: Maybe<string>
}

function _Grass({ moodColor }: Props) {
  if (!moodColor) return <StyledGrass />
  return (
    <StyledGrass moodColor={moodColor === 'isEmpty' ? '$color9' : moodColor} />
  )
}

const StyledGrass = styled(View, {
  width: 16,
  height: 16,
  rounded: '$1',
  variants: {
    moodColor: {
      ':string': bg => ({ bg }),
    },
  },
})

export const Grass = memo(_Grass)
Grass.displayName = 'Grass'
