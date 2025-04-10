export interface StepProgressStoreState {
  currentStep: number
  totalSteps: number

  isLastStep: boolean
  progress: number

  initialize: (totalSteps: number) => void
  goToNextStep: () => void
  goToPrevStep: () => void
  setStep: (step: number) => void
}
