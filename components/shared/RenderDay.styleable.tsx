import { useTranslation } from 'react-i18next'
import { Text, type TextProps } from 'tamagui'

import { WEEK_DAY } from '@/constants'

import { BaseText } from './BaseText'

interface Props extends TextProps {
  createdAt: string
}

export const RenderDay = Text.styleable<Props>(
  ({ createdAt, ...props }, ref) => {
    const { t } = useTranslation()
    const day = new Date(createdAt).getDay()

    return (
      <BaseText ref={ref} {...props}>
        {t(`calendar.days.${Object.keys(WEEK_DAY)[(day + 6) % 7]}`)}
        {t('common.units.day')}
      </BaseText>
    )
  },
)

RenderDay.displayName = 'RenderDay'
