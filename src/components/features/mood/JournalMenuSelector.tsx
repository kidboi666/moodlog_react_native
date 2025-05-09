import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/components/shared'
import { Layout, MOUNT_STYLE } from '@/constants'
import { useStepProgress } from '@/store'

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

export const JournalMenuSelector = () => {
  const {
    goToNextStep,
    goToPrevStep,
    state: { currentStep, totalSteps },
  } = useStepProgress()
  const { t } = useTranslation()

  return (
    <Container>
      <Button
        scaleIcon={1.5}
        color='$color11'
        icon={ChevronLeft}
        disabled={currentStep === 0}
        opacity={currentStep === 0 ? 0.2 : 1}
        onPress={goToPrevStep}
      />
      <TitleYStack key={currentStep}>
        <H3 text='center'>{t(menuList[currentStep].title)}</H3>
        <BaseText text='center'>
          {t(menuList[currentStep].description)}
        </BaseText>
      </TitleYStack>
      <Button
        scaleIcon={1.5}
        color='$color11'
        icon={ChevronRight}
        disabled={currentStep === totalSteps - 1}
        opacity={currentStep === totalSteps - 1 ? 0.2 : 1}
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
