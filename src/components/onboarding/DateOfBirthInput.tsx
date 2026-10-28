import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateOfBirthInputProps {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function parseDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}

export default function DateOfBirthInput({
  value,
  onChange,
  error,
}: DateOfBirthInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const maximumDate = new Date();
  const selectedDate = parseDate(value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DATE OF BIRTH</Text>

      {Platform.OS === 'web' ? (
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="YYYY-MM-DD"
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          accessibilityLabel="Date of birth"
          style={[styles.input, error && styles.inputError]}
        />
      ) : (
        <>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowPicker(true)}
            style={[styles.input, styles.dateButton]}
          >
            <Text style={value ? styles.dateText : styles.placeholder}>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : 'Select your date of birth'}
            </Text>
            <Text style={styles.calendarIcon}>▦</Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={selectedDate ?? new Date(2000, 0, 1)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={maximumDate}
              onChange={(event, date) => {
                if (Platform.OS !== 'ios') {
                  setShowPicker(false);
                }

                if (event.type === 'set' && date) {
                  onChange(formatDate(date));
                }

                if (event.type === 'dismissed') {
                  setShowPicker(false);
                }
              }}
            />
          )}

          {Platform.OS === 'ios' && showPicker && (
            <Pressable
              onPress={() => setShowPicker(false)}
              style={styles.doneButton}
            >
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          )}
        </>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {Platform.OS === 'web' && (
        <Text style={styles.helper}>
          Enter your birth date as YYYY-MM-DD.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#444444',
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111111',
    backgroundColor: '#F7F7F9',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#111111',
    fontSize: 16,
  },
  placeholder: {
    color: '#888888',
    fontSize: 16,
  },
  calendarIcon: {
    color: '#666666',
    fontSize: 20,
  },
  doneButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  doneText: {
    color: '#3478F6',
    fontWeight: '700',
  },
  inputError: {
    borderColor: '#D92D20',
  },
  error: {
    color: '#D92D20',
    fontSize: 12,
  },
  helper: {
    color: '#777777',
    fontSize: 12,
  },
});