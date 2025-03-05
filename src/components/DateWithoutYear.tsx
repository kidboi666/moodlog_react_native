import { Paragraph, TextProps } from 'tamagui';

interface Props extends TextProps {
  timestamp?: string | number;
  localDate?: string;
}

export const DateWithoutYear = ({ timestamp, localDate, ...props }: Props) => {
  if (localDate) {
    const [, month, day] = localDate.split('-');
    return (
      <Paragraph color="$gray11" {...props}>
        {month}. {day}.
      </Paragraph>
    );
  }

  if (timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return (
      <Paragraph color="$gray9" {...props}>
        {month}. {day}.
      </Paragraph>
    );
  }

  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return (
    <Paragraph color="$gray9" {...props}>
      {month}. {day}.
    </Paragraph>
  );
};
