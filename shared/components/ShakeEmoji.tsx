import { useEffect, useState } from 'react'
import { Button, H1, styled } from 'tamagui'

interface Props {
  duration?: number
  emoji: string
}

export const ShakeEmoji = ({ duration, emoji }: Props) => {
  const [isRotate, setIsRotate] = useState(false)
  const [isShaking, setIsShaking] = useState(true)

  useEffect(() => {
    let shakeInterval: NodeJS.Timeout
    let stopTimer: NodeJS.Timeout

    if (isShaking) {
      shakeInterval = setInterval(() => {
        setIsRotate(prev => !prev)
      }, 300)
    }

    if (duration) {
      stopTimer = setTimeout(() => {
        setIsShaking(false)
        setIsRotate(false)
      }, duration)
    }

    return () => {
      clearInterval(shakeInterval)
      clearTimeout(stopTimer)
    }
  }, [duration, isShaking])

  return (
    <EmojiButton
      isRotate={isRotate}
      onPress={() => setIsShaking(prev => !prev)}
    >
      <H1>{emoji}</H1>
    </EmojiButton>
  )
}

const EmojiButton = styled(Button, {
  unstyled: true,
  animation: 'medium',
  rotate: '0deg',
  pressStyle: {
    scale: 0.85,
  },

  variants: {
    isRotate: {
      true: {
        rotate: '40deg',
      },
    },
  } as const,
})
