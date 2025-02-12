import { Paragraph, TextProps } from 'tamagui';

interface Props extends TextProps {
  timestamp?: string | number;
  localDate?: string;
}
export const CurrentDate = ({ timestamp, localDate, ...props }: Props) => {
  if (localDate) {
    const [year, month, day] = localDate.split('-');
    return (
      <Paragraph {...props}>
        {year}. {month}. {day}.
      </Paragraph>
    );
  }

  if (timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return (
      <Paragraph {...props}>
        {year}. {month}. {day}.
      </Paragraph>
    );
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return (
    <Paragraph {...props}>
      {year}. {month}. {day}.
    </Paragraph>
  );
};
