import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { ListRenderItemInfo, Pressable, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/lib/store/appStore';
import { Timezone } from '@/lib/store/timezoneStore';

import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

type Props = Pick<ListRenderItemInfo<Timezone>, 'item' | 'index'>;

export const TimezonePickerItem = ({ item, index }: Props) => {
  const router = useRouter();

  const toggleSelectTimezone = useAppStore(
    (state) => state.toggleSelectTimezone
  );

  const isFirstItem = index === 0;

  const itemContainerStyle = useMemo(
    () => [styles.itemContainer, isFirstItem && styles.itemContainerFirst],
    [isFirstItem]
  );

  const formattedOffset = useMemo(() => {
    const offset = item.offset;
    const sign = !!offset && offset < 0 ? '-' : '+';
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.round((Math.abs(offset) % 1) * 60);

    const formattedMinutes = minutes
      ? `${minutes.toString().padStart(2, '0')}m`
      : '';

    return `${sign} ${hours}h ${formattedMinutes}`;
  }, [item.offset]);

  const handlePress = useCallback(() => {
    toggleSelectTimezone(item.code);

    router.back();
  }, [item.code, router, toggleSelectTimezone]);

  /* 
    **Cairo**
    +6 h | Africa | [Timezone name]
  */

  return (
    <Pressable onPress={handlePress}>
      <ThemedView style={itemContainerStyle} backgroundColorKey={'background'}>
        <ThemedText type={'defaultSemiBold'}>{item.name}</ThemedText>
        <ThemedText lightColor={Colors.light.icon} darkColor={Colors.dark.icon}>
          {formattedOffset} | {item.code}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    // Thanks to big lineHeight, no need to add gap

    paddingVertical: 8,
    paddingHorizontal: 16,

    // TODO: Move border as ItemSeparatorComponent
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.text,
  },
  itemContainerFirst: {
    borderTopWidth: 1,
    borderTopColor: Colors.dark.text,
  },
});
