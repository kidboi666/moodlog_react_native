import { useEffect } from 'react';

export const useDebouncedEffect = (effect, deps, delay = 500) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps]);
};
