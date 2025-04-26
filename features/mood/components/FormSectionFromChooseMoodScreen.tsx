import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack, styled } from 'tamagui'

import { H3, PaginationDot, PressableButton } from '@/shared/components'
import { CONTAINER_HORIZONTAL_PADDING } from '@/shared/constants'

interface Props {
  selectedMoodId: string
  onLeftPress: () => void
  onRightPress: () => void
  totalPage: number
  onNext: () => void
  page: number
}

export const FormSectionFromChooseMoodScreen = ({
  selectedMoodId,
  onLeftPress,
  onRightPress,
  totalPage,
  page,
  onNext,
}: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <SpacingYStack spacing>
        <BetweenXStack>
          <Button bg='transparent' icon={ChevronLeft} onPress={onLeftPress} />
          <H3>{t('moods.my.selectTitle')}</H3>
          <Button bg='transparent' icon={ChevronRight} onPress={onRightPress} />
        </BetweenXStack>
        <PaginationDot totalPage={totalPage} page={page} />
      </SpacingYStack>
      <SpacingYStack>
        <PressableButton disabled={!selectedMoodId} onPress={onNext} my='$8'>
          {t('common.ok')}
        </PressableButton>
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
