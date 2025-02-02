import { useTheme } from '@/store/context/useTheme';
import {
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
      style={[{ backgroundColor: colors.button.primary }, style]}
      {...props}>
      <View>
        <Text style={{ color: colors.buttonText.primary }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};
