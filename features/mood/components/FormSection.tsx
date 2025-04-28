import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, useWindowDimensions } from 'react-native'
import { Button, XStack, YStack, styled, useControllableState } from 'tamagui'

import { ColorPicker } from '@/features/write/components'
import { BaseText, H4 } from '@/shared/components'
import { Layout, MOUNT_STYLE } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'
import { MoodNameForm } from './MoodNameForm'

interface Props {
  name: string
  setName: (name: string) => void
  sharedColor: any
}

export const FormSection = ({ name, setName, sharedColor }: Props) => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const {
    goToPrevStep,
    goToNextStep,
    state: { currentStep },
  } = useStepProgress()
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
    if (currentStep === 0) {
      Keyboard.dismiss()
    }
  }, [currentStep])

  return (
    <Container>
      <TitleContainer>
        <LeftButton icon={ChevronLeft} onPress={handleLeftPress} />
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
        <RightButton icon={ChevronRight} onPress={handleRightPress} />
      </TitleContainer>
      <FormContainer {...position}>
        <ColorPicker
          show={currentStep === 0}
          sharedColor={sharedColor}
          width={width - Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2}
        />
        <MoodNameForm
          name={name}
          setName={setName}
          width={width - Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2}
        />
      </FormContainer>
    </Container>
  )
}

const Container = styled(YStack, {
  gap: '$4',
})

const TitleContainer = styled(XStack, {
  width: '100%',
  justify: 'space-between',
})

const LeftButton = styled(Button, {
  bg: 'transparent',
  width: 40,
  minW: 40,
})

const RightButton = styled(Button, {
  bg: 'transparent',
  width: 40,
  minW: 40,
})

const TitleBox = styled(YStack, {
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  gap: '$2',
  overflow: 'hidden',
  flex: 1,
  maxW: '70%',
  items: 'flex-start',
})

const FormContainer = styled(XStack, {
  gap: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2,
  animation: 'quick',
})

const menuList = [
  {
    title: 'moods.my.moodColor.title',
    description: 'moods.my.moodColor.description',
  },
  { title: 'placeholders.moodName', description: 'warn.createMood.name.1' },
]
