import { Progress as TamaguiProgress, XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/components/shared'
import { useMood } from '@/store'

interface Props {
  moodScore: number
  moodId: string
  moodColor: string
}

export function ProgressGraph({ moodScore, moodId, moodColor }: Props) {
  const moods = useMood(state => state.moods)
  const mood = moods[moodId]

  return (
    <GraphContainer>
      <GraphNameBox>
        <H3>{mood?.name || moodId}</H3>
        <GraphName>{`${Math.floor(moodScore)}%`}</GraphName>
      </GraphNameBox>
      <Progress value={moodScore}>
        <ProgressIndicator bg={moodColor as any} />
      </Progress>
    </GraphContainer>
  )
}

const GraphContainer = styled(YStack, {
  gap: '$2',
})

const GraphNameBox = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
})

const GraphName = styled(BaseText, {
  color: '$gray9',
})

const Progress = styled(TamaguiProgress, {
  size: '$1',
  height: 20,
})

const ProgressIndicator = styled(TamaguiProgress.Indicator, {
  animation: 'bouncy',
})
