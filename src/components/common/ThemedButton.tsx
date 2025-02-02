import { useTheme } from '@/store/context/useTheme';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface Props extends TouchableOpacityProps {}

export const ThemedButton = ({ style, children, ...props }: Props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: colors.button.primary },
        styles.touchable,
        style,
      ]}
      {...props}>
      <View>
        <Text style={{ color: colors.buttonText.primary }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
