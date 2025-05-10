import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack, styled } from 'tamagui'

import { BaseText, H4 } from '@/components/shared'
import { MOUNT_STYLE } from '@/constants'

const menuList = [
  {
    title: 'moods.my.moodColor.title',
    description: 'moods.my.moodColor.description',
  },
  { title: 'placeholders.moodName', description: 'warn.createMood.name.1' },
]

interface Props {
  handleLeftPress: () => void
  handleRightPress: () => void
  currentStep: number
}

export function MoodMenuSelector({
  handleLeftPress,
  handleRightPress,
  currentStep,
}: Props) {
  const { t } = useTranslation()

  return (
    <TitleContainer>
      <Button animation='quick' icon={ChevronLeft} onPress={handleLeftPress} />
      <TitleBox key={currentStep}>
        <H4 numberOfLines={1} ellipsizeMode='tail' text='center'>
          {t(menuList[currentStep].title)}
        </H4>
        <BaseText
          fontSize='$4'
          color='$color10'
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {t(menuList[currentStep].description)}
        </BaseText>
      </TitleBox>
      <Button
        animation='quick'
        icon={ChevronRight}
        onPress={handleRightPress}
      />
    </TitleContainer>
  )
}

const TitleContainer = styled(XStack, {
  width: '100%',
  justify: 'space-between',
  mt: 40,
})

const TitleBox = styled(YStack, {
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  gap: '$2',
  flex: 1,
  items: 'center',
})
