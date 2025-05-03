import { Dispatch, SetStateAction } from 'react'
import { StyleSheet } from 'react-native'
import RnColorPicker, {
  ColorFormatsObject,
  HueSlider,
  Panel1,
} from 'reanimated-color-picker'

interface Props {
  color: string
  setColor: Dispatch<SetStateAction<string>>
  width: number
  show: boolean
}

export const ColorPicker = ({ color, setColor, width, show }: Props) => {
  const height = show ? undefined : 0

  const onSelectColor = (color: ColorFormatsObject) => {
    setColor(color.hex)
  }

  return (
    <RnColorPicker
      style={[styles.container, { width, height }]}
      value={color}
      onChangeJS={onSelectColor}
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
