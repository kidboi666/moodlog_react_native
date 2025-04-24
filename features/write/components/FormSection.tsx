import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack, useControllableState } from 'tamagui'

import { useStepProgress } from '@/store'
import { CONTAINER_HORIZONTAL_PADDING, MOUNT_STYLE } from 'shared/constants'

import { ColorPicker, MoodNameForm } from '@/features/write/components/index'
import { BaseText, H3, StepDot } from '@/shared/components'
import { useEffect } from 'react'
import { Keyboard, useWindowDimensions } from 'react-native'

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
  const { width } = useWindowDimensions()
  const { goToNextStep, goToPrevStep, currentStep } = useStepProgress()
  const [positionI, setPositionI] = useControllableState({
    strategy: 'most-recent-wins',
    defaultProp: 0,
  })

  const positionList = [{ x: 0 }, { x: -width }]
  const position = positionList[positionI]
  const handleLeftPress = () => {
    if (currentStep === 1) {
      goToPrevStep()
      setPositionI(
        prev => (prev + positionList.length - 1) % positionList.length,
      )
    }
  }
  const handleRightPress = () => {
    if (currentStep === 0) {
      goToNextStep()
      setPositionI(prev => (prev + 1) % positionList.length)
    }
  }

  useEffect(() => {
    if (currentStep === 1) {
      Keyboard.dismiss()
    }
  }, [currentStep])

  return (
    <>
      <XStack width='100%' justify='space-between'>
        <Button icon={ChevronLeft} onPress={handleLeftPress} />
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
        <Button icon={ChevronRight} onPress={handleRightPress} />
      </XStack>
      <XStack
        gap={CONTAINER_HORIZONTAL_PADDING * 2}
        animation='quick'
        {...position}
      >
        <MoodNameForm
          name={name}
          setName={setName}
          width={width - CONTAINER_HORIZONTAL_PADDING * 2}
        />
        <ColorPicker
          sharedColor={sharedColor}
          width={width - CONTAINER_HORIZONTAL_PADDING * 2}
        />
      </XStack>
      <StepDot />
    </>
  )
}
