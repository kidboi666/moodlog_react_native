import { DateContextProvider } from '@/store/contexts/DateContext';
import { JournalContextProvider } from '@/store/contexts/JournalContext';
import { DraftContextProvider } from '@/store/contexts/DraftContext';
import { StatisticsContextProvider } from '@/store/contexts/StatisticsContext';
import { AppContextProvider } from '@/store/contexts/AppContext';
import { ScrollContextProvider } from '@/store/contexts/ScrollContext';
import { UserContextProvider } from '@/store/contexts/UserContext';
import { GardenContextProvider } from '@/store/contexts/GardenContext';
import { DevContextProvider } from '@/store/contexts/DevContext';
import { PropsWithChildren } from 'react';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <DateContextProvider>
      <JournalContextProvider>
        <DraftContextProvider>
          <StatisticsContextProvider>
            <AppContextProvider>
              <ScrollContextProvider>
                <UserContextProvider>
                  <GardenContextProvider>
                    <DevContextProvider>{children}</DevContextProvider>
                  </GardenContextProvider>
                </UserContextProvider>
              </ScrollContextProvider>
            </AppContextProvider>
          </StatisticsContextProvider>
        </DraftContextProvider>
      </JournalContextProvider>
    </DateContextProvider>
  );
};
