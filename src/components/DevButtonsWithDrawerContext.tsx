import { Button, H1, View } from 'tamagui';
import { useDev } from '@/store/hooks/useDev';
import { useUser } from '@/store/hooks/useUser';

export const DevButtonsWithDrawerContext = () => {
  const { onClearUserStorage, onClearJournalStorage } = useDev();
  const { setIsInitialUser } = useUser();

  return (
    <View>
      <H1>DEV</H1>
      <Button onPress={onClearUserStorage}>Clear User Storage</Button>
      <Button onPress={onClearJournalStorage}>Clear Journal Storage</Button>
      <Button onPress={() => setIsInitialUser(false)}>Set Initial User</Button>
    </View>
  );
};
