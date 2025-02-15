import { createContext, PropsWithChildren, useCallback, useState } from 'react';

export const DrawerContext = createContext({
  isDrawerOpen: false,
  setIsDrawerOpen: (isOpen: boolean) => {},
  toggleDrawer: (navigation: any) => {},
  openDrawer: (navigation: any) => {},
  closeDrawer: (navigation: any) => {},
});

export const DrawerContextProvider = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(navigation => {
    setIsDrawerOpen(prev => !prev);
    navigation.toggleDrawer();
  }, []);

  const openDrawer = useCallback(navigation => {
    setIsDrawerOpen(true);
    navigation.openDrawer();
  }, []);

  const closeDrawer = useCallback(navigation => {
    setIsDrawerOpen(false);
    navigation.closeDrawer();
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        openDrawer,
        closeDrawer,
        setIsDrawerOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
