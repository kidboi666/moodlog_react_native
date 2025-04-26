import {
  BaseText,
  H3,
  PaginationDot,
  PressableButton,
} from '@/shared/components'
import { CONTAINER_HORIZONTAL_PADDING, MOUNT_STYLE } from '@/shared/constants'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { XStack, YStack, styled } from 'tamagui'

const menuList = [
  {
    title: 'moods.my.moodSelect.title',
    description: 'moods.my.moodSelect.description',
  },
  {
    title: 'moods.my.moodLevel.title',
    description: 'moods.my.moodLevel.description',
  },
]

interface Props {
  selectedMoodId: string
  totalPage: number
  page: number
  onNext: () => void
  onPrev: () => void
  currentStep: number
}

export const FormSectionFromChooseMoodScreen = ({
  selectedMoodId,
  totalPage,
  page,
  onNext,
  onPrev,
  currentStep,
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <SpacingYStack spacing>
        <PaginationDot totalPage={totalPage} page={page} />
        <BetweenXStack>
          <PressableButton
            bg='transparent'
            icon={ChevronLeft}
            onPress={onPrev}
          />
          <YStack
            key={currentStep}
            animation='lazy'
            enterStyle={MOUNT_STYLE}
            exitStyle={MOUNT_STYLE}
            gap='$2'
            overflow='hidden'
          >
            <H3>{t(menuList[currentStep].title)}</H3>
            <BaseText>{t(menuList[currentStep].description)}</BaseText>
          </YStack>
          <PressableButton
            bg='transparent'
            icon={ChevronRight}
            disabled={!selectedMoodId}
            onPress={onNext}
          />
        </BetweenXStack>
      </SpacingYStack>
    </>
  )
}

const SpacingYStack = styled(YStack, {
  px: CONTAINER_HORIZONTAL_PADDING,

  variants: {
    spacing: {
      true: {
        gap: '$4',
      },
    },
  } as const,
})

const BetweenXStack = styled(XStack, {
  justify: 'space-between',
  items: 'center',
})
