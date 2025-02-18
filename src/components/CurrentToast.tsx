import { Toast, useToastState } from '@tamagui/toast';
import { isWeb, YStack } from 'tamagui';
import { useAppTheme } from '@/store/hooks/useAppTheme';

export function CurrentToast() {
  const currentToast = useToastState();
  const { currentTheme } = useAppTheme();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? '$12' : '$3'}
      theme={currentTheme === 'dark' ? 'light' : 'dark'}
      rounded="$6"
      animation="quick"
    >
      <YStack items="center" p="$2" gap="$2">
        <Toast.Title fontWeight="bold">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}
