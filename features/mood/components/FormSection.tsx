import { XStack, YStack, styled } from 'tamagui'

import { ColorPicker } from '@/features/write/components'
import { Layout } from '@/shared/constants'
import { MoodNameForm } from './MoodNameForm'

interface Props {
  name: string
  setName: (name: string) => void
  sharedColor: any
  position: Record<string, number>
  width: number
  currentStep: number
}

export const FormSection = ({
  name,
  setName,
  sharedColor,
  position,
  width,
  currentStep,
}: Props) => {
  return (
    <Container>
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
  flex: 1,
})

const FormContainer = styled(XStack, {
  gap: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2,
  animation: 'quick',
  flex: 1,
})
