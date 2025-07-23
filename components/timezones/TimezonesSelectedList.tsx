import { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/lib/store/appStore';
import { Timezone, useTimezoneStore } from '@/lib/store/timezoneStore';

import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

export const TimezonesSelectedList = () => {
  const selectedTimezoneIds = useAppStore((state) => state.selectedTimezoneIds);
  const timezones = useTimezoneStore((state) => state.timezones);

  const selectedTimezones = timezones.filter((timezone) =>
    selectedTimezoneIds.includes(timezone.id)
  );

  const renderItem: ListRenderItem<Timezone> = useCallback(({ item }) => {
    return (
      <ThemedView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 100,
          paddingHorizontal: 16,
          paddingVertical: 8,

          borderWidth: 1,
          borderColor: Colors.light.background,

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 6,

          flex: 1,
        }}
      >
        <ThemedText type={'subtitle'}>{item.name}</ThemedText>
        {/* TODO: Figure out what to show here */}
      </ThemedView>
    );
  }, []);

  return (
    <FlatList
      data={selectedTimezones}
      renderItem={renderItem}
      style={{ flex: 1, width: '100%', paddingHorizontal: 16 }}
      contentContainerStyle={{
        gap: 16,
      }}
    />
  );
};
