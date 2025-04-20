import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { XStack, YStack } from 'tamagui'

import { CONTAINER_HORIZONTAL_PADDING } from '@/constants'
import type { Journal } from '@/types'

import { HeaderContent } from '@/components/shared/HeaderContent'
import { PressableButton } from '@/components/shared/PressableButton'
import { RenderDate } from '@/components/shared/RenderDate'
import { RenderDay } from '@/components/shared/RenderDay'
import { RenderTime } from '@/components/shared/RenderTime'

interface Props {
  journal: Journal
  onDeletePress: () => void
  onBackPress: () => void
}

export const JournalHeader = memo(
  ({ journal, onDeletePress, onBackPress }: Props) => {
    return (
      <HeaderContent items='center' px={CONTAINER_HORIZONTAL_PADDING} gap='$4'>
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
