import { Plus } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';

export const NewWriteButton = () => {
  const router = useRouter();
  return (
    <Button
      icon={<Plus size="$2" />}
      elevate
      position="absolute"
      animation="medium"
      size="$6"
      b="$4"
      r="$4"
      rounded="$6"
      bg="$color"
      color="$background"
      onPress={() => router.push('/write')}
    />
  );
};
