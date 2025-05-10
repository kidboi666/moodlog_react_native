import { View, XStack, styled } from 'tamagui'

interface Props {
  page: number
  totalPage: number
  show: boolean
}

export function PaginationDot({ show, page, totalPage }: Props) {
  if (!show) {
    return null
  }

  return (
    <SpacingBox>
      {Array.from({ length: totalPage }, (_, i) => (
        <Dot key={i} isCurrentStep={i === page} />
      ))}
    </SpacingBox>
  )
}

const SpacingBox = styled(XStack, {
  gap: '$2',
  items: 'center',
  pb: '$4',
})

const Dot = styled(View, {
  width: '$0.75',
  height: '$0.75',
  rounded: '$4',
  bg: '$color7',

  variants: {
    isCurrentStep: {
      true: {
        bg: '$color12',
      },
    },
  } as const,
})
