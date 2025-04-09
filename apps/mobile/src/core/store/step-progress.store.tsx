import { ReactNode, useEffect } from 'react';

import { create } from 'zustand';

import { StepProgressStoreState } from '@/types/step-progress.types';

export const useStepProgress = create<StepProgressStoreState>(set => ({
  currentStep: 0,
  totalSteps: 5,

  isLastStep: false,
  progress: 0,

  initialize: totalSteps =>
    set(() => {
      const totalStepsValue = Math.max(1, totalSteps);
      return {
        totalSteps: totalStepsValue,
        currentStep: 0,
        isLastStep: false,
        progress: totalStepsValue > 1 ? 0 : 100,
      };
    }),

  goToNextStep: () =>
    set(state => {
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps - 1);
      const isLastStep = nextStep === state.totalSteps - 1;
      const progress =
        state.totalSteps > 1 ? (nextStep / state.totalSteps) * 100 : 100;

      return { currentStep: nextStep, isLastStep, progress };
    }),

  goToPrevStep: () =>
    set(state => {
      const prevStep = Math.max(state.currentStep - 1, 0);
      const isLastStep = prevStep === state.totalSteps - 1;
      const progress =
        state.totalSteps > 1 ? (prevStep / state.totalSteps) * 100 : 100;

      return { currentStep: prevStep, isLastStep, progress };
    }),

  setStep: step =>
    set(state => {
      const safeStep = Math.max(0, Math.min(step, state.totalSteps - 1));
      const isLastStep = safeStep === state.totalSteps - 1;
      const progress =
        state.totalSteps > 1 ? (safeStep / state.totalSteps) * 100 : 100;

      return { currentStep: safeStep, isLastStep, progress };
    }),
}));

export function StepProgressProvider({
  children,
  totalSteps,
}: {
  children: ReactNode;
  totalSteps: number;
}) {
  const initialize = useStepProgress(state => state.initialize);

  useEffect(() => {
    initialize(totalSteps);
  }, [initialize, totalSteps]);

  return <>{children}</>;
}
