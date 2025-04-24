import { View, XStack, styled } from 'tamagui'

const DotContainer = styled(XStack, {
  gap: 2,
  position: 'absolute',
  b: '$1',
})

const Dot = styled(View, {
  width: '$0.5',
  height: '$0.5',
  b: -8,
  rounded: '$1',

  variants: {
    backgroundStyle: {
      ':string': bg => {
        return { bg }
      },
    },
  } as const,
})

interface Props {
  journalCount?: number
  isSelected?: boolean
  variant?: 'default' | 'contained'
}

export const DateCountDot = ({
  journalCount,
  isSelected,
  variant = 'default',
}: Props) => {
  if (!journalCount) return null
  return (
    <DotContainer>
      {Array.from({ length: journalCount }, (_, i) => {
        if (i >= 3) return null
        return (
          <Dot
            key={`${i}-${journalCount}`}
            backgroundStyle={
              variant === 'contained'
                ? isSelected
                  ? '$gray12'
                  : '$gray1'
                : isSelected
                  ? '$gray1'
                  : '$gray12'
            }
          />
        )
      })}
    </DotContainer>
  )
}
