import { useContext } from 'react';
import { GardenContext } from '@/store/contexts/GardenContext';

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGarden must be used within a GardenContextProvider');
  }
  return context;
};
