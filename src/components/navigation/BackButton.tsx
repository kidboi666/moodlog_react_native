import { Button } from '../common/Button';
import { useRouter } from 'expo-router';
import { X } from '@tamagui/lucide-icons';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      icon={<X size="$1" />}
      variant="secondary"
      size="sm"
      items="center"
      justify="center"
      onPress={() => router.back()}
    ></Button>
  );
};
