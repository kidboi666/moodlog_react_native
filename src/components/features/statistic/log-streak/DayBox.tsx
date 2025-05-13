import { BaseText } from '@/components/shared'
import { WEEK_DAY } from '@/constants'
import { XStack, YStack, styled } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

const mockData = [1, 1, 0, 0, 0, 0]

export function DayBox() {
  return (
    <XStack>
      {Object.values(WEEK_DAY).map((day, i) => (
        <DayContainer key={day}>
          <CircleGradient completed={!!mockData[i]} />
          <DayText>{day}</DayText>
        </DayContainer>
      ))}
    </XStack>
  )
}

const DayContainer = styled(YStack, {
  flex: 1,
  gap: '$2',
  items: 'center',
})

const CircleGradient = styled(LinearGradient, {
  width: '$3',
  height: '$3',
  rounded: '$8',
  colors: ['$gray7', '$gray4'],
  start: [0, 0.2],
  end: [2, 3],

  variants: {
    completed: {
      true: {
        colors: ['$green10', '$green5'],
      },
    },
  } as const,
})

const DayText = styled(BaseText, {
  defaultFontSize: '$3',
})
