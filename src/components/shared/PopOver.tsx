import { ReactElement } from 'react';
import { Popover, PopoverProps, YStack } from 'tamagui';

interface Props extends PopoverProps {
  trigger: ReactElement;
}

export const PopOver = ({ trigger, children, ...props }: Props) => {
  return (
    <Popover size="$5" allowFlip {...props}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$3">
          <Popover.Close asChild>{children}</Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};

PopOver.displayName = 'PopOver';
