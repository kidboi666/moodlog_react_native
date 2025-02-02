import { StyleSheet, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  spacing?: number;
  flex?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
}

export const XStack = ({
  style,
  spacing = 0,
  flex,
  alignCenter,
  justifyCenter,
  ...props
}: Props) => {
  return (
    <View
      style={[
        styles.x,
        flex && { flex: 1 },
        alignCenter && { alignItems: 'center' },
        justifyCenter && { justifyContent: 'center' },
        spacing > 0 && { gap: spacing },
        style,
      ]}
      {...props}
    />
  );
};
export const YStack = ({
  style,
  spacing = 0,
  flex,
  alignCenter,
  justifyCenter,
  ...props
}: Props) => {
  return (
    <View
      style={[
        styles.y,
        spacing > 0 && { gap: spacing },
        flex && { flex: 1 },
        alignCenter && { alignItems: 'center' },
        justifyCenter && { justifyContent: 'center' },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  x: {
    flexDirection: 'row',
  },
  y: {
    flexDirection: 'column',
  },
});

XStack.displayName = 'XStack';
YStack.displayName = 'YStack';
