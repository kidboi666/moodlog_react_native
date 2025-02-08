import { Separator } from 'tamagui';
import { Container } from '@/components/common/Container';
import { JournalCard } from '@/components/home/JournalCard';
import { FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useDiary } from '@/store/useDiary';
import { HomeHeader } from '@/components/home/HomeHeader';

export default function HomeScreen() {
  const [selectedMenu, setSelectedMenu] = useState<'month' | 'week'>('month');
  const { journals, removeJournal } = useDiary();
  const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  return (
    <Container
      key={key}
      animation="quick"
      enterStyle={{
        x: -300,
        opacity: 0,
      }}
    >
      <FlatList
        data={journals}
        ListHeaderComponent={() => (
          <HomeHeader
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        )}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" my="$3" />
        )}
        renderItem={itemData => (
          <JournalCard journal={itemData.item} onDelete={removeJournal} />
        )}
      />
    </Container>
  );
}
