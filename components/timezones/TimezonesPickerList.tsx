import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { useAppStore } from '@/lib/store/appStore';
import { Timezone, useTimezoneStore } from '@/lib/store/timezoneStore';

import { TimezonePickerItem } from './TimezonePickerItem';

type Props = {
  searchQuery: string;
};

export const TimezonesPickerList = ({ searchQuery }: Props) => {
  const timezones = useTimezoneStore((state) => state.timezones);

  const selectedTimezoneIds = useAppStore((state) => state.selectedTimezoneIds);

  const filteredTimezones = useMemo(
    () =>
      timezones.filter(
        (timezone) =>
          !selectedTimezoneIds.includes(timezone.id) &&
          [timezone.name.toLowerCase(), timezone.code.toLowerCase()].some(
            (value) => value.includes(searchQuery.toLowerCase())
          )
      ),
    [timezones, selectedTimezoneIds, searchQuery]
  );

  const renderItem: ListRenderItem<Timezone> = useCallback(
    ({ item, index }) => (
      <TimezonePickerItem item={item} index={index} key={item.id} />
    ),
    []
  );

  // TODO: This should probably be a section list with regions as sections (America, Europe, etc.)
  // TODO: Add a search bar to the top of the list
  // TODO: Add an inset shadow to the top and bottom of the list, when not scrolled to the end
  return <FlatList renderItem={renderItem} data={filteredTimezones} />;
};
