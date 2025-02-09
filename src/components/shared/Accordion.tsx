import { Accordion as AccordionBase } from 'tamagui';
import { ReactNode } from 'react';

interface Props {
  items: {
    value: string;
    trigger: (open: boolean) => ReactNode;
    content: () => ReactNode;
  }[];
  type: 'single' | 'multiple';
}

export const Accordion = ({ items, type = 'single' }: Props) => {
  return (
    <AccordionBase type={type}>
      {items.map(item => (
        <AccordionBase.Item key={item.value} value={item.value}>
          <AccordionBase.Trigger unstyled>
            {({ open }: { open: boolean }) => item.trigger(open)}
          </AccordionBase.Trigger>
          <AccordionBase.HeightAnimator animation="medium">
            <AccordionBase.Content
              animation="medium"
              exitStyle={{ opacity: 0 }}
            >
              {() => item.content}
            </AccordionBase.Content>
          </AccordionBase.HeightAnimator>
        </AccordionBase.Item>
      ))}
    </AccordionBase>
  );
};
