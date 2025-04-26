import { AnimatePresence, View, XStack, styled } from 'tamagui'

interface Props {
  page: number
  totalPage: number
}

export const PaginationDot = ({ page, totalPage }: Props) => {
  return (
    <Container>
      <SpacingBox>
        <AnimatePresence>
          {Array.from({ length: totalPage }, (_, i) => (
            <Dot key={i} isCurrentStep={i === page} />
          ))}
        </AnimatePresence>
      </SpacingBox>
    </Container>
  )
}

const Container = styled(View, {
  items: 'center',
})

const SpacingBox = styled(XStack, {
  gap: '$2',
})

const Dot = styled(View, {
  width: '$1',
  height: '$0.75',
  rounded: '$4',
  bg: '$color7',
  scale: 1,

  variants: {
    isCurrentStep: {
      true: {
        bg: '$color12',
        scaleX: 1.2,
      },
    },
  } as const,
})
