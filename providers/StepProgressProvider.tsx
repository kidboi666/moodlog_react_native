import { ReactNode, useEffect } from 'react'

import { useStepProgress } from 'shared/store'

export const StepProgressProvider = ({
  children,
  totalSteps,
}: {
  children: ReactNode
  totalSteps: number
}) => {
  const initialize = useStepProgress(state => state.initialize)

  useEffect(() => {
    initialize(totalSteps)
  }, [initialize, totalSteps])

  return <>{children}</>
}
