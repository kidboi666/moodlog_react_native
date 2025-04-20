import { useTranslation } from 'react-i18next'
import { Progress as TamaguiProgress, XStack, YStack, styled } from 'tamagui'

import { useApp } from '@/store'

import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'

export const GraphContainer = styled(YStack, {
  gap: '$2',
})

export const GraphNameBox = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
})

export const GraphName = styled(BaseText, {
  color: '$gray9',
})

export const Progress = styled(TamaguiProgress, {
  size: '$1',
  height: 20,
})

export const ProgressIndicator = styled(TamaguiProgress.Indicator, {
  animation: 'bouncy',
})
interface Props {
  moodScore: number
  moodId: string
  moodColor: string
}

export const ProgressGraph = ({ moodScore, moodId, moodColor }: Props) => {
  const { t } = useTranslation()
  const myMoods = useApp(state => state.myMoods)
  const mood = myMoods[moodId]

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
