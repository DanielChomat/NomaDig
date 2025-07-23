import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors } from '@/constants/Colors';

import { TimezonesPickerList } from './TimezonesPickerList';

export const TimezonePicker = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      <TimezonesPickerList searchQuery={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
    paddingBottom: 8,

    gap: 8,
  },

  inputContainer: {
    paddingHorizontal: 16,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.dark.text,
    padding: 12,
  },
});
