import { SizableText, type TextProps } from 'tamagui'
import { BaseText } from './BaseText'

interface Props extends TextProps {
  createdAt: string
}

export const RenderTime = SizableText.styleable<Props>(
  ({ createdAt, ...props }, ref) => {
    const date = new Date(createdAt)

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    const timestamp = `${hours}: ${minutes}`
    return (
      <BaseText ref={ref} {...props}>
        {timestamp}
      </BaseText>
    )
  },
)

RenderTime.displayName = 'RenderTime'
