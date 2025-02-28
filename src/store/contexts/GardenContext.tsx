import { LoadingState, Nullable, WithState } from '@/types/utils';
import { createContext, PropsWithChildren, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';

type Context = WithState<{}, LoadingState>;

export const GardenContext = createContext<Nullable<Context>>(null);

export const GardenContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const { journals } = useJournal();
  const [monthlyJournals, setMonthlyJournals] = useState();

  return (
    <GardenContext.Provider value={{ isLoading }}>
      {children}
    </GardenContext.Provider>
  );
};
