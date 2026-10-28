import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Gender } from '../../types/profile';

interface GenderSelectorProps {
  value: Gender | null;
  onChange: (gender: Gender) => void;
}

const OPTIONS: { label: string; value: Gender }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer not to say', value: 'prefer_not_to_say' },
];

export default function GenderSelector({
  value,
  onChange,
}: GenderSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>GENDER</Text>

      <View style={styles.options}>
        {OPTIONS.map((option) => {
          const selected = value === option.value;

          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => onChange(option.value)}
              style={[
                styles.option,
                selected && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.selectedText,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#444444',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    backgroundColor: '#E8F0FF',
    borderColor: '#3478F6',
  },
  optionText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: '500',
  },
  selectedText: {
    color: '#245CC5',
    fontWeight: '700',
  },
});