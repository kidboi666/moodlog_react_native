import { useContext } from 'react';
import { StepProgressContext } from '@/store/contexts/PageProgressContext';

export const useStepProgress = () => {
  const context = useContext(StepProgressContext);
  if (!context) {
    throw new Error(
      'useSteProgress must be used within a StepProgressContextProvider',
    );
  }
  return context;
};
