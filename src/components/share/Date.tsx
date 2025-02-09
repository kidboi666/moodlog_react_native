import { Paragraph, TextProps } from 'tamagui';
import { formatDate } from '@/utils/common/formatDate';

export const CurrentDate = ({ ...props }: TextProps) => {
  const { year, month, day } = formatDate(new Date());

  return (
    <Paragraph {...props}>
      {year}. {month}. {day}.
    </Paragraph>
  );
};
