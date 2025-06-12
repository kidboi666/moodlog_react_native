import { PropsWithChildren } from 'react'

import { StepProgressProvider as ProgressProvider } from '@/store'

interface Props {
  totalSteps: number
}

export const StepProgressProvider = ({
  children,
  totalSteps,
}: PropsWithChildren<Props>) => {
  return <ProgressProvider totalSteps={totalSteps}>{children}</ProgressProvider>
}
