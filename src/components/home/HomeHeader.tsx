import { Button, H1, ScrollView, Text, XStack, YStack } from 'tamagui';
import { formatDate } from '@/utils/common/formatDate';

interface Props {
  selectedMenu: 'month' | 'week';
  setSelectedMenu: (selectedMenu: 'month' | 'week') => void;
}

export const HomeHeader = ({ selectedMenu, setSelectedMenu }: Props) => {
  const { year, month, day } = formatDate(new Date());

  return (
    <YStack gap={12} mb="$5">
      <H1 fontWeight="800">Home</H1>
      <Text>
        {year}. {month}. {day}.
      </Text>
      <ScrollView horizontal>
        <XStack gap={8}>
          <Button
            animation="quick"
            onPress={() => setSelectedMenu('month')}
            themeInverse={selectedMenu === 'month'}
          >
            Month
          </Button>
          <Button
            animation="quick"
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
