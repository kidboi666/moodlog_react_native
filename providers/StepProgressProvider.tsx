import { StepProgressProvider as ProgressProvider } from '@/shared/store/step-progress.store'
import { PropsWithChildren } from 'react'

interface Props {
  totalSteps: number
}

export const StepProgressProvider = ({
  children,
  totalSteps,
}: PropsWithChildren<Props>) => {
  return <ProgressProvider totalSteps={totalSteps}>{children}</ProgressProvider>
}
