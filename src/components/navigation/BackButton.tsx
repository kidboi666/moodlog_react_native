import { Button } from '@/components/common/Button';
import { useNavigation } from '@react-navigation/native';

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Button variant="text" onPress={() => navigation.goBack()}>
      취소
    </Button>
  );
};
