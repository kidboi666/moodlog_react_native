import { Button, H1, ScrollView, XStack, YStack } from 'tamagui';
import { CurrentDate } from '@/components/share/Date';

interface Props {
  selectedMenu: 'month' | 'week';
  setSelectedMenu: (selectedMenu: 'month' | 'week') => void;
}

export const HomeFlatListHeaderContent = ({
  selectedMenu,
  setSelectedMenu,
}: Props) => {
  return (
    <YStack gap={12} mb="$5">
      <H1 fontWeight="800">Home</H1>
      <CurrentDate />
      <ScrollView horizontal>
        <XStack gap={8}>
          <Button
            animation="medium"
            onPress={() => setSelectedMenu('month')}
            themeInverse={selectedMenu === 'month'}
          >
            Month
          </Button>
          <Button
            animation="medium"
            onPress={() => setSelectedMenu('week')}
            themeInverse={selectedMenu === 'week'}
          >
            Week
          </Button>
        </XStack>
      </ScrollView>
    </YStack>
  );
};
