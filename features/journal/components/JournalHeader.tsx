import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { XStack, YStack } from 'tamagui'

import { CONTAINER_HORIZONTAL_PADDING } from 'shared/constants'
import type { Journal } from 'shared/types'

import { HeaderContent } from '@/shared/components/HeaderContent'
import { PressableButton } from '@/shared/components/PressableButton'
import { RenderDate } from '@/shared/components/RenderDate'
import { RenderDay } from '@/shared/components/RenderDay'
import { RenderTime } from '@/shared/components/RenderTime'

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
