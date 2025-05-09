import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react'
import { Maybe } from 'types'

interface StepProgressState {
  currentStep: number
  totalSteps: number
  isLastStep: boolean
  progress: number
}

type StepProgressAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_STEP'; payload: number }

const initialState: StepProgressState = {
  currentStep: 0,
  totalSteps: 3,
  isLastStep: false,
  progress: 0,
}

function stepProgressReducer(
  state: StepProgressState,
  action: StepProgressAction,
): StepProgressState {
  switch (action.type) {
    case 'NEXT_STEP': {
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps - 1)
      const isLastStep = nextStep === state.totalSteps - 1
      const progress =
        state.totalSteps > 1 ? (nextStep / state.totalSteps) * 100 : 100

      return { ...state, currentStep: nextStep, isLastStep, progress }
    }
    case 'PREV_STEP': {
      const prevStep = Math.max(state.currentStep - 1, 0)
      const isLastStep = prevStep === state.totalSteps - 1
      const progress =
        state.totalSteps > 1 ? (prevStep / state.totalSteps) * 100 : 100

      return { ...state, currentStep: prevStep, isLastStep, progress }
    }
    case 'SET_STEP': {
      const safeStep = Math.max(
        0,
        Math.min(action.payload, state.totalSteps - 1),
      )
      const isLastStep = safeStep === state.totalSteps - 1
      const progress =
        state.totalSteps > 1 ? (safeStep / state.totalSteps) * 100 : 100

      return { ...state, currentStep: safeStep, isLastStep, progress }
    }
    default:
      return state
  }
}

interface StepProgressContextType {
  state: StepProgressState
  goToNextStep: () => void
  goToPrevStep: () => void
  setStep: (step: number) => void
}

const StepProgressContext = createContext<Maybe<StepProgressContextType>>(null)

interface Props {
  totalSteps: number
}

export const StepProgressProvider = ({
  children,
  totalSteps,
}: PropsWithChildren<Props>) => {
  const [state, dispatch] = useReducer(stepProgressReducer, {
    ...initialState,
    totalSteps,
    progress: 0,
  })

  const goToNextStep = () => {
    dispatch({ type: 'NEXT_STEP' })
  }

  const goToPrevStep = () => {
    dispatch({ type: 'PREV_STEP' })
  }

  const setStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const value = {
    state,
    goToNextStep,
    goToPrevStep,
    setStep,
  }

  return (
    <StepProgressContext.Provider value={value}>
      {children}
    </StepProgressContext.Provider>
  )
}

export function useStepProgress() {
  const context = useContext(StepProgressContext)
  if (!context) {
    throw new Error(
      'useStepProgress는 StepProgressProvider 내에서 사용해야 합니다',
    )
  }
  return context
}
