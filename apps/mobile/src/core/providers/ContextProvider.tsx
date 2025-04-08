import { PropsWithChildren } from 'react';

import { AppContextProvider } from '@/core/store/contexts/app.context';
import { BottomSheetProvider } from '@/core/store/contexts/bottom-sheet.context';
import { JournalContextProvider } from '@/core/store/contexts/journal.context';
import { UserContextProvider } from '@/core/store/contexts/user.context';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <AppContextProvider>
      <UserContextProvider>
        <JournalContextProvider>
          <BottomSheetProvider>{children}</BottomSheetProvider>
        </JournalContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  );
};
