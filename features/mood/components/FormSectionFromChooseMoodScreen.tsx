import { BaseText, H3, PressableButton } from '@/shared/components'
import { Layout, MOUNT_STYLE } from '@/shared/constants'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack, styled } from 'tamagui'

interface Props {
  selectedMoodId: string
  onNext: () => void
  onPrev: () => void
  currentStep: number
}

export const FormSectionFromChooseMoodScreen = ({
  selectedMoodId,
  onNext,
  onPrev,
  currentStep,
}: Props) => {
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
    <Fragment>
      <SpacingYStack spacing>
        <BetweenXStack>
          <PressableButton
            bg='transparent'
            icon={ChevronLeft}
            onPress={onPrev}
          />
          <TitleYStack key={currentStep}>
            <H3>{t(menuList[currentStep].title)}</H3>
            <BaseText>{t(menuList[currentStep].description)}</BaseText>
          </TitleYStack>
          <PressableButton
            bg='transparent'
            icon={ChevronRight}
            disabled={!selectedMoodId}
            onPress={onNext}
          />
        </BetweenXStack>
      </SpacingYStack>
    </Fragment>
  )
}

const SpacingYStack = styled(YStack, {
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,

  variants: {
    spacing: {
      true: {
        gap: '$4',
      },
    },
  } as const,
})

const TitleYStack = styled(YStack, {
  gap: '$2',
  overflow: 'hidden',
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  flex: 1,
})

const BetweenXStack = styled(XStack, {
  justify: 'space-between',
  items: 'center',
})
