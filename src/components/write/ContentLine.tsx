import { useTheme } from '@/store/context/useTheme';
import { memo, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const ContentLine = memo(({ style }: Props) => {
  const { isDark } = useTheme();

  const borderStyle = useMemo(
    () => ({
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#424242' : '#E0E0E0',
    }),
    [isDark],
  );

  return <View style={[borderStyle, style]} />;
});
