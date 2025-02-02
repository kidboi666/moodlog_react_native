import {
  ThemedInput,
  ThemedInputProps,
} from '@/components/common/ThemedInput.tsx';
import { StyleSheet } from 'react-native';

interface TitleInputProps extends ThemedInputProps {}

export const TitleInput = ({ ...props }: TitleInputProps) => {
  return <ThemedInput style={[styles.container]} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
