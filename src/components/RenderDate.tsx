import { Paragraph, TextProps } from 'tamagui';

interface Props extends TextProps {
  timestamp?: string | number;
  localDate?: string;
  onlyText?: boolean;
}

export const RenderDate = ({
  timestamp,
  localDate,
  onlyText,
  ...props
}: Props) => {
  const renderText = (
    year: string | number,
    month: string | number,
    day: string | number,
  ) => {
    return `${year}. ${month}. ${day}.`;
  };

  if (localDate) {
    const [year, month, day] = localDate.split('-');

    if (onlyText) return renderText(year, month, day);

    return <Paragraph {...props}>{renderText(year, month, day)}</Paragraph>;
  }

  if (timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    if (onlyText) return renderText(year, month, day);

    return <Paragraph {...props}>{renderText(year, month, day)}</Paragraph>;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  if (onlyText) return renderText(year, month, day);

  return <Paragraph {...props}>{renderText(year, month, day)}</Paragraph>;
};
