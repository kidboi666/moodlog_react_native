import { memo } from 'react'
import { Text, type TextProps } from 'tamagui'

import { BaseText } from './BaseText'

interface Props extends TextProps {
  timestamp?: string | number
  localDate?: string
  onlyText?: boolean
}

const StyledRenderDate = Text.styleable<Props>(
  ({ timestamp, localDate, onlyText, ...props }, ref) => {
    const renderText = (
      year: string | number,
      month: string | number,
      day: string | number,
    ) => {
      return `${year}. ${month}. ${day}.`
    }

    if (localDate) {
      const [year, month, day] = localDate.split('-')

      if (onlyText) return renderText(year, month, day)

      return (
        <BaseText ref={ref} {...props}>
          {renderText(year, month, day)}
        </BaseText>
      )
    }

    if (timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      if (onlyText) return renderText(year, month, day)

      return (
        <BaseText ref={ref} {...props}>
          {renderText(year, month, day)}
        </BaseText>
      )
    }

    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')

    if (onlyText) return renderText(year, month, day)

    return (
      <BaseText ref={ref} {...props}>
        {renderText(year, month, day)}
      </BaseText>
    )
  },
)

export const RenderDate = memo(StyledRenderDate)

RenderDate.displayName = 'RenderDate'
