import { SharedValue } from 'react-native-reanimated'
import RnColorPicker, {
  ColorFormatsObject,
  HueSlider,
  Panel1,
} from 'reanimated-color-picker'

interface Props {
  sharedColor: SharedValue<string>
}

export const ColorPicker = ({ sharedColor }: Props) => {
  const onSelectColor = (color: ColorFormatsObject) => {
    'worklet'

    sharedColor.value = color.hex
  }

  return (
    <RnColorPicker
      style={{ gap: 12, flexDirection: 'row' }}
      value={sharedColor.value}
      onComplete={onSelectColor}
    >
      <Panel1 style={{ flex: 1 }} />
      <HueSlider vertical />
    </RnColorPicker>
  )
}
