import { YStack, styled } from 'tamagui'

import { H1 } from '@/components/shared/Heading'
import { ViewContainer as HOSContainer } from '@/components/shared/ViewContainer.styleable'

export const ViewContainer = styled(HOSContainer, {
  gap: '$4',
})

export const Title = styled(H1)

export const JournalBox = styled(YStack, {
  gap: '$6',
})

export const DateGroup = styled(YStack, {
  gap: '$2',
})
