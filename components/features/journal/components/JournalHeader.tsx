import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { XStack, YStack } from 'tamagui'

import {
  HeaderContent,
  PressableButton,
  RenderDate,
  RenderDay,
  RenderTime,
} from '@/components/shared'
import { Layout } from '@/constants'
import type { Journal } from '@/types'

interface Props {
  journal: Journal
  onDeletePress: () => void
  onBackPress: () => void
}

export const JournalHeader = memo(
  ({ journal, onDeletePress, onBackPress }: Props) => {
    return (
      <HeaderContent
        items='center'
        px={Layout.SPACE.CONTAINER_HORIZONTAL_PADDING}
        gap='$4'
      >
        <PressableButton icon={ArrowLeft} onPress={onBackPress} />
        <YStack items='center'>
          <RenderDate color='$gray8' fontSize='$5' fontWeight='800'>
            {journal.localDate}
          </RenderDate>
          <XStack gap='$2'>
            <RenderDay
              color='$gray8'
              fontSize='$5'
              fontWeight='800'
              createdAt={journal.createdAt}
            />
            <RenderTime
              color='$gray8'
              fontSize='$5'
              fontWeight='800'
              createdAt={journal.createdAt}
            />
          </XStack>
        </YStack>

        <PressableButton icon={Trash2} onPress={onDeletePress} />
      </HeaderContent>
    )
  },
)
