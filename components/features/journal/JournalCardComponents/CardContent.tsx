import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'

import { BaseText, RenderTime } from '@/components/shared'
import { PressableButton } from '@/components/shared/PressableButton'
import { Position } from '@/types'
import { Card, View, YStack, styled } from 'tamagui'

const CardHeader = styled(Card.Header, {
  padded: true,
  flex: 1,
  gap: '$4',
  items: 'center',
  flexDirection: 'row',
})

const MoodBar = styled(View, {
  width: '$0.75',
  my: 'auto',
  height: '75%',
  rounded: '$8',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  } as const,
})

const JournalContentBox = styled(YStack, {
  flex: 1,
  gap: '$2',
})

const JournalContentText = styled(BaseText, {
  color: '$gray12',
  flex: 1,
  numberOfLines: 4,
})

const TimeText = styled(RenderTime, {
  fontSize: '$7',
  lineHeight: 20,
  color: '$gray9',
  fontWeight: '800',
})

interface CardContentProps {
  content: string
  createdAt: string
  moodColor?: string
  cardPosition: Position
  toggleState: () => void
}

export const CardContent = ({
  content,
  createdAt,
  moodColor,
  cardPosition,
  toggleState,
}: CardContentProps) => {
  return (
    <CardHeader>
      <MoodBar moodColor={moodColor} />
      <JournalContentBox>
        <TimeText createdAt={createdAt} />
        <JournalContentText>{content}</JournalContentText>
      </JournalContentBox>
      <PressableButton
        bg='$backgroundStrong'
        icon={cardPosition === Position.CENTER ? ChevronRight : ChevronLeft}
        onPress={() => toggleState()}
      />
    </CardHeader>
  )
}
