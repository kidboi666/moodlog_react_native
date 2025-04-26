import { StyleSheet } from 'react-native'
import { SharedValue } from 'react-native-reanimated'
import RnColorPicker, {
  ColorFormatsObject,
  HueSlider,
  Panel1,
} from 'reanimated-color-picker'

interface Props {
  sharedColor: SharedValue<string>
  width: number
}

export default function ColorPicker({ sharedColor, width }: Props) {
  const onSelectColor = (color: ColorFormatsObject) => {
    'worklet'

    sharedColor.value = color.hex
  }

  return (
    <RnColorPicker
      style={[styles.container, { width }]}
      value={sharedColor.value}
      onComplete={onSelectColor}
    >
      <Panel1 style={styles.panel} />
      <HueSlider vertical />
    </RnColorPicker>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexDirection: 'row',
  },
  panel: { flex: 1 },
})
