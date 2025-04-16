import { useApp } from '@/core/store/app.store'
import { TimeFormat } from '@/types/app.types'
import { Text, type TextProps } from 'tamagui'
import { BaseText } from './BaseText'

interface Props extends TextProps {
  createdAt: string | number
}

export const RenderTime = Text.styleable<Props>(
  ({ createdAt, ...props }, ref) => {
    const timeFormat = useApp(state => state.settings.timeFormat)
    const date = new Date(createdAt)

    let timestamp = ''

    if (timeFormat === TimeFormat.HOUR_12) {
      // 12시간제 형식 (AM/PM)
      const hours = date.getHours()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const hour12 = hours % 12 || 12 // 0시는 12시로 표시
      const minutes = String(date.getMinutes()).padStart(2, '0')
      timestamp = `${hour12}:${minutes} ${ampm}`
    } else {
      // 24시간제 형식 (기본값)
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      timestamp = `${hours}:${minutes}`
    }

    return (
      <BaseText ref={ref} {...props}>
        {timestamp}
      </BaseText>
    )
  },
)

RenderTime.displayName = 'RenderTime'
