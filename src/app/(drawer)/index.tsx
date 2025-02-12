import {
  Button,
  H1,
  ScrollView,
  Separator,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { CurrentDate } from '@/components/Date';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/Container';
import { useToastController } from '@tamagui/toast';

export default function HomeScreen() {
  const [selectedMenu, setSelectedMenu] = useState<'month' | 'week'>('month');
  const { journals, removeJournal } = useJournalContext();
  const toast = useToastController();

  return (
    <Container>
      <FlatList
        data={journals}
        ListHeaderComponent={() => (
          <YStack gap="$2" mb="$4">
            <H1 fontWeight="800">Home</H1>
            <CurrentDate timestamp={Date.now()} />
            <View>
              <ScrollView horizontal>
                <XStack gap="$4">
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
                  <Button onPress={() => toast.show('sdf')}>토스트</Button>
                </XStack>
              </ScrollView>
            </View>
          </YStack>
        )}
        ItemSeparatorComponent={() => (
          <Separator borderColor="$gray5" mb="$4" mx="$2" />
        )}
        renderItem={itemData => (
          <JournalCard journal={itemData.item} onDelete={removeJournal} />
        )}
      />
    </Container>
  );
}
