import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { Nullable } from '@/types/utils';
import { IStepProgressStore } from '@/types/store';

export const StepProgressContext =
  createContext<Nullable<IStepProgressStore>>(null);

export const StepProgressContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChangeNextStep = useCallback(() => {
    if (currentStep + 1 < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(0);
    }
  }, [currentStep, totalSteps]);

  const handleChangePreviousStep = useCallback(() => {
    if (currentStep - 1 > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setCurrentStep(totalSteps);
    }
  }, [currentStep, totalSteps]);

  const initialStep = useCallback((totalSteps: number) => {
    setTotalSteps(totalSteps);
  }, []);

  return (
    <StepProgressContext.Provider
      value={{
        totalSteps,
        currentStep,
        onChangeNextStep: handleChangeNextStep,
        onChangePreviousStep: handleChangePreviousStep,
        initialStep,
      }}
    >
      {children}
    </StepProgressContext.Provider>
  );
};
