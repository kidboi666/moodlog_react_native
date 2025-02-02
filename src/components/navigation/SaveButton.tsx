import { Button } from '@/components/common/Button';
import { PALETTE } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const SaveButton = () => {
  return (
    <Button variant="text" textStyle={styles.text}>
      완료
    </Button>
  );
};

const styles = StyleSheet.create({
  text: {
    color: PALETTE.blue.main,
  },
});
