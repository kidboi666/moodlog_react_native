import { H1, ScrollView, Separator, useTheme, XStack, YStack } from 'tamagui';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { JournalCard } from '@/components/home/JournalCard';
import { FlatList } from 'react-native';
import { Text } from '@/components/common/Text';
import { formatDate } from '@/utils/common/formatDate';

export default function HomeScreen() {
  const theme = useTheme();
  const mockItem = [
    { title: '안녕하세요', content: '내용입니다.', emotion: '$color.red500' },
    { title: '안녕하세요', content: '아이앰 수우', emotion: '$color.green500' },
    { title: '안녕하세요', content: '아이앰 수우', emotion: '$color.red500' },
    {
      title: '안녕하세요',
      content: '아이앰 수우',
      emotion: '$color.yellow500',
    },
  ];
  const { year, month, day } = formatDate(new Date());
  return (
    <Container gap={12}>
      <FlatList
        data={mockItem}
        ListHeaderComponent={() => (
          <YStack gap={12} mb="$5">
            <H1 fontSize="$9" fontWeight="900" color="$text">
              Home
            </H1>
            <Text>
              {year}년 {month}월 {day}일
            </Text>
            <ScrollView horizontal>
              <XStack gap={8}>
                <Button>
                  <Button.Text>글쓰기 페이지로 이동</Button.Text>
                </Button>
                <Button>
                  <Button.Text>프로필 페이지로 이동</Button.Text>
                </Button>
              </XStack>
            </ScrollView>
          </YStack>
        )}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" my="$3" />
        )}
        renderItem={itemData => (
          <JournalCard
            title={itemData.item.title}
            content={itemData.item.content}
            emotion={itemData.item.emotion}
          />
        )}
      />
    </Container>
  );
}
