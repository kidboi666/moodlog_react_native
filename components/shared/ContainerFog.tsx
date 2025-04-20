import { Fragment, memo } from 'react'
import { styled, useTheme } from 'tamagui'

import { Platform } from 'react-native'
import { LinearGradient } from 'tamagui/linear-gradient'

const TopFog = styled(LinearGradient, {
  position: 'absolute',
  t: 0,
  l: 0,
  r: 0,
  height: 80,
  z: 100,
  start: [0, 0],
  end: [0, 1],
  pointerEvents: 'none',
})

const BottomFog = styled(LinearGradient, {
  position: 'absolute',
  b: Platform.OS === 'ios' ? 94 : 80,
  l: 0,
  r: 0,
  height: 30,
  z: 1,
  start: [0, 0],
  end: [0, 1],
  pointerEvents: 'none',
})

interface Props {
  shouldHideTabBar: boolean
}

export const ContainerFog = memo(({ shouldHideTabBar }: Props) => {
  const theme = useTheme()

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const formattedHex = hex.replace(
      shorthandRegex,
      (_, r, g, b) => r + r + g + g + b + b,
    )
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      formattedHex,
    )

    return result
      ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`
      : '255, 255, 255'
  }

  const bgRgb = hexToRgb(theme.background.val)

  const transparentBg = `rgba(${bgRgb}, 0)`

  return (
    <Fragment>
      <TopFog
        colors={[
          '$background',
          `rgba(${bgRgb}, 0.9)`,
          `rgba(${bgRgb}, 0.7)`,
          `rgba(${bgRgb}, 0.3)`,
          transparentBg,
        ]}
      />
      {!shouldHideTabBar && (
        <BottomFog
          colors={[
            transparentBg,
            `rgba(${bgRgb}, 0.3)`,
            `rgba(${bgRgb}, 0.7)`,
            `rgba(${bgRgb}, 0.9)`,
            '$background',
          ]}
        />
      )}
    </Fragment>
  )
})
