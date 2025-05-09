import { Toast, useToastState } from '@tamagui/toast'
import { YStack, styled } from 'tamagui'

import { useAppTheme } from 'store'

export const CurrentToast = () => {
  const currentToast = useToastState()
  const { currentTheme } = useAppTheme()

  if (!currentToast || currentToast.isHandledNatively) return null

  return (
    <ToastContainer
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      theme={currentTheme === 'dark' ? 'light' : 'dark'}
      presetColor={currentToast.preset}
    >
      <ToastContent>
        <ToastTitle>{currentToast.title}</ToastTitle>
        {!!currentToast.message && (
          <Toast.Description>
            <ToastDescription>{currentToast.message}</ToastDescription>
          </Toast.Description>
        )}
      </ToastContent>
    </ToastContainer>
  )
}

const ToastContainer = styled(Toast, {
  animation: 'quick',
  enterStyle: { opacity: 0, scale: 0.5, y: -25 },
  exitStyle: { opacity: 0, scale: 1, y: -20 },
  y: '$3',
  rounded: '$6',

  variants: {
    presetColor: {
      ':string': preset => {
        switch (preset) {
          case 'error':
            return { bg: '#e53e3e' }
          case 'notice':
            return { bg: '#3182c3' }
          case 'success':
            return { bg: '#38a169' }
        }
      },
    },
  },
})

const ToastContent = styled(YStack, {
  items: 'center',
  p: '$2',
  gap: '$2',
})

const ToastTitle = styled(Toast.Title, {
  fontWeight: '800',
})

const ToastDescription = styled(Toast.Description, {
  color: '$color',
})
