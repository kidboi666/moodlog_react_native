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
  show: boolean
}

export const ColorPicker = ({ sharedColor, width, show }: Props) => {
  const height = show ? undefined : 0

  const onSelectColor = (color: ColorFormatsObject) => {
    'worklet'

    sharedColor.value = color.hex
  }

  return (
    <RnColorPicker
      style={[styles.container, { width, height }]}
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
  panel: {
    flex: 1,
    height: '100%',
  },
})
