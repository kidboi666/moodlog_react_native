import { H1, ScrollView, Separator, XStack, YStack } from 'tamagui';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { JournalCard } from '@/components/home/JournalCard';
import { FlatList } from 'react-native';

export default function HomeScreen() {
  const mockItem = [
    { title: '안녕하세요', content: '내용입니다.', emotion: '$color.red800' },
    { title: '안녕하세요', content: '아이앰 수우', emotion: '$color.green800' },
    { title: '안녕하세요', content: '아이앰 수우', emotion: '$color.red700' },
    {
      title: '안녕하세요',
      content: '아이앰 수우',
      emotion: '$color.yellow700',
    },
  ];
  return (
    <Container gap={12}>
      <YStack gap={12}>
        <H1 fontSize="$9" fontWeight="900" color="$textPrimary">
          Home
        </H1>
        <ScrollView horizontal>
          <XStack gap={8}>
            <Button variant="outlined">글쓰기 페이지로 이동</Button>
            <Button>프로필 페이지로 이동</Button>
          </XStack>
        </ScrollView>
      </YStack>
      <FlatList
        data={mockItem}
        style={{ gap: 4 }}
        ItemSeparatorComponent={() => <Separator borderColor="$line" my="$2" />}
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
