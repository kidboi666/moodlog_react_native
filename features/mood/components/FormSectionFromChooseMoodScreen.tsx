import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/shared/components'
import { Layout, MOUNT_STYLE } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'

interface Props {
  selectedMoodId: string
}

export const FormSectionFromChooseMoodScreen = ({ selectedMoodId }: Props) => {
  const {
    goToNextStep,
    goToPrevStep,
    state: { currentStep },
  } = useStepProgress()
  const { t } = useTranslation()

  const menuList = [
    {
      title: 'moods.my.moodSelect.title',
      description: 'moods.my.moodSelect.description',
    },
    {
      title: 'moods.my.moodLevel.title',
      description: 'moods.my.moodLevel.description',
    },
    {
      title: 'write.title',
      description: 'write.description',
    },
  ]

  return (
    <Container>
      <Button
        bg='transparent'
        scaleIcon={1.5}
        icon={ChevronLeft}
        onPress={goToPrevStep}
      />
      <TitleYStack key={currentStep}>
        <H3 text='center'>{t(menuList[currentStep].title)}</H3>
        <BaseText text='center'>
          {t(menuList[currentStep].description)}
        </BaseText>
      </TitleYStack>
      <Button
        bg='transparent'
        scaleIcon={1.5}
        icon={ChevronRight}
        disabled={!selectedMoodId}
        onPress={goToNextStep}
      />
    </Container>
  )
}

const Container = styled(XStack, {
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  gap: '$4',
  justify: 'space-between',
  items: 'center',
})

const TitleYStack = styled(YStack, {
  gap: '$2',
  overflow: 'hidden',
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  flex: 1,
})
