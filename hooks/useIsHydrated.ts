import { useEffect, useState } from 'react';

import { useAppStore } from '@/lib/store/appStore';

export const useIsHydrated = (): boolean => {
  const [hydrated, setHydrated] = useState(false);
  const persist = useAppStore.persist;

  useEffect(() => {
    if (!persist) {
      return;
    }
    // Listen for hydration finish
    const unsubFinishHydration = persist.onFinishHydration(() =>
      setHydrated(true)
    );

    // Set initial hydration state
    setHydrated(persist.hasHydrated?.() ?? false);

    return () => {
      unsubFinishHydration();
    };
  }, [persist]);

  return hydrated;
};
