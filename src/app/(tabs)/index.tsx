import { Separator } from 'tamagui';
import { JournalCard } from '@/components/home/JournalCard';
import { FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useDiary } from '@/store/useDiary';
import { HomeFlatListHeaderContent } from '@/components/home/HomeFlatListHeaderContent';
import { Container } from '@/components/share/Container';

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
      animation="medium"
      enterStyle={{
        x: -300,
        opacity: 0,
      }}
    >
      <FlatList
        data={journals}
        ListHeaderComponent={() => (
          <HomeFlatListHeaderContent
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
