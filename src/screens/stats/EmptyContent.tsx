import { Button, H5, Text, View, YStack } from 'tamagui';
import { Minimize2 } from '@tamagui/lucide-icons';

export const EmptyExpandedContent = () => {
  return (
    <View
      p="$4"
      animation="quick"
      animateOnly={['opacity']}
      justify="space-between"
      flex={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <YStack gap="$2">
        <H5 fontWeight="800">컨텐츠가 없습니다.</H5>
        <Text>일기를 작성하면 관련된 정보를 볼 수 있습니다.</Text>
      </YStack>
      <Button
        unstyled
        self="flex-end"
        opacity={0.2}
        icon={<Minimize2 size="$1" />}
      />
    </View>
  );
};
