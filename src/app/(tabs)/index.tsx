import {
  Button,
  H1,
  ScrollView,
  Separator,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { JournalCard } from '@/components/home/JournalCard';
import { FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { Container } from '@/components/shared/Container';
import { CurrentDate } from '@/components/shared/Date';

export default function HomeScreen() {
  const [selectedMenu, setSelectedMenu] = useState<'month' | 'week'>('month');
  const { journals, removeJournal } = useJournal();
  const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  return (
    <Container
      key={key}
      animation="medium"
      enterStyle={{
        x: -300,
        opacity: 0,
      }}
    >
      <YStack gap="$2">
        <H1 fontWeight="800">Hello John!</H1>
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
            </XStack>
          </ScrollView>
        </View>
      </YStack>
      <FlatList
        data={journals}
        contentContainerStyle={{
          paddingVertical: 18,
        }}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" mb="$4" />
        )}
        renderItem={itemData => (
          <JournalCard journal={itemData.item} onDelete={removeJournal} />
        )}
      />
    </Container>
  );
}
