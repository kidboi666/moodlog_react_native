import {
  ThemedInput,
  ThemedInputProps,
} from '@/components/common/ThemedInput.tsx';
import { StyleSheet } from 'react-native';

interface ContentInputProps extends ThemedInputProps {}

export const ContentInput = ({ ...props }: ContentInputProps) => {
  return <ThemedInput style={styles.container} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
