import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { Nullable } from '@/types/utils';
import { IStepProgressStore } from '@/types/store';

export const StepProgressContext =
  createContext<Nullable<IStepProgressStore>>(null);

interface Props {
  initialStep?: number;
  totalSteps: number;
}

export const StepProgressContextProvider = ({
  children,
  initialStep = 0,
  totalSteps,
}: PropsWithChildren<Props>) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNextStep = useCallback(() => {
    if (currentStep + 1 < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(0);
    }
  }, [currentStep, totalSteps]);

  const goToPrevStep = useCallback(() => {
    if (currentStep - 1 >= 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setCurrentStep(totalSteps - 1);
    }
  }, [currentStep, totalSteps]);

  const isLastStep = currentStep === totalSteps - 1;
  const progress = totalSteps > 1 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <StepProgressContext.Provider
      value={{
        totalSteps,
        currentStep,
        goToNextStep,
        goToPrevStep,
        isLastStep,
        progress,
      }}
    >
      {children}
    </StepProgressContext.Provider>
  );
};
