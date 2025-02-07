import { Button } from '../common/Button';
import { useRouter } from 'expo-router';
import { X } from '@tamagui/lucide-icons';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button onPress={() => router.back()}>
      <Button.Icon>
        <X size="$1" />
      </Button.Icon>
    </Button>
  );
};
