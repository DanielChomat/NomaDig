import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { timeZones } from '../../utils/timeZoneData';

export type Timezone = {
  id: string;
  name: string;
  code: string;
  offset: number;
  lastUsed: Date;
  isFavorite: boolean;
};

type TimezoneState = {
  timezones: Timezone[];
  toggleFavorite: (timezoneId: string) => void;
  updateLastUsed: (timezoneId: string) => void;
  getFavoriteTimezones: () => Timezone[];
  getRecentlyUsedTimezones: (limit?: number) => Timezone[];
  getTimezoneById: (id: string) => Timezone | undefined;
};

// Initialize timezones with metadata
const initialTimezones: Timezone[] = timeZones.map((tz) => {
  const [_region, city] = tz.split('/');
  return {
    id: tz,
    name: city.replace(/_/g, ' '),
    code: tz,
    offset: 3, // This should be calculated based on the timezone
    lastUsed: new Date(0),
    isFavorite: false,
  };
});

export const useTimezoneStore = create<TimezoneState>()(
  persist(
    (set, get) => ({
      timezones: initialTimezones,

      toggleFavorite: (timezoneId: string) => {
        set((state: TimezoneState) => ({
          timezones: state.timezones.map((tz) =>
            tz.id === timezoneId ? { ...tz, isFavorite: !tz.isFavorite } : tz
          ),
        }));
      },

      updateLastUsed: (timezoneId: string) => {
        set((state: TimezoneState) => ({
          timezones: state.timezones.map((tz) =>
            tz.id === timezoneId ? { ...tz, lastUsed: new Date() } : tz
          ),
        }));
      },

      getFavoriteTimezones: () => {
        return get().timezones.filter((tz) => tz.isFavorite);
      },

      getRecentlyUsedTimezones: (limit = 5) => {
        return [...get().timezones]
          .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
          .slice(0, limit);
      },

      getTimezoneById: (id: string) => {
        return get().timezones.find((tz) => tz.id === id);
      },
    }),
    {
      name: 'timezone-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ timezones }) => ({
        timezones,
      }),
    }
  )
);
