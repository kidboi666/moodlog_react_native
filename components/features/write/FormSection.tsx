import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack } from 'tamagui'

import { MOUNT_STYLE } from '@/constants'
import { StepProgressProvider } from '@/providers'
import { useStepProgress } from '@/store'

import { ColorPicker, MoodNameForm } from '@/components/features/write'
import { BaseText, H3, StepDot } from '@/components/shared'

interface Props {
  name: string
  setName: (name: string) => void
  sharedColor: any
}

const menuList = [
  { title: 'placeholders.moodName', description: 'warn.createMood.name.1' },
  {
    title: 'moods.my.moodColor.title',
    description: 'moods.my.moodColor.description',
  },
]

export const FormSection = ({ name, setName, sharedColor }: Props) => {
  const { t } = useTranslation()
  const { goToNextStep, goToPrevStep, currentStep } = useStepProgress()
  return (
    <StepProgressProvider totalSteps={2}>
      <XStack width='100%' justify='space-between'>
        <Button icon={ChevronLeft} onPress={goToPrevStep} />
        <YStack
          key={currentStep}
          animation='lazy'
          enterStyle={MOUNT_STYLE}
          exitStyle={MOUNT_STYLE}
          gap='$2'
          overflow='hidden'
        >
          <H3>{t(menuList[currentStep].title)}</H3>
          <BaseText fontSize='$4' color='$color10'>
            {t(menuList[currentStep].description)}
          </BaseText>
        </YStack>
        <Button icon={ChevronRight} onPress={goToNextStep} />
      </XStack>
      {currentStep === 0 && <MoodNameForm name={name} setName={setName} />}
      {currentStep === 1 && <ColorPicker sharedColor={sharedColor} />}
      <StepDot />
    </StepProgressProvider>
  )
}
