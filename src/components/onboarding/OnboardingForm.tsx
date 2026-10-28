import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import AppButton from '../ui/AppButton';
import AppTextInput from '../ui/AppTextInput';
import DateOfBirthInput from './DateOfBirthInput';
import GenderSelector from './GenderSelector';

import type { Gender, UserProfile } from '../../types/profile';
import { saveProfile } from '../../services/profileStorage';

export default function OnboardingForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    const nextErrors: Record<string, string> = {};
    const trimmedName = name.trim();

    if (!trimmedName) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!dateOfBirth) {
      nextErrors.dateOfBirth = 'Please select your date of birth.';
    } else {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth);

      if (!match) {
        nextErrors.dateOfBirth = 'Use the format YYYY-MM-DD.';
      } else {
        const [, year, month, day] = match;
        const parsed = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );

        const isRealDate =
          parsed.getFullYear() === Number(year) &&
          parsed.getMonth() === Number(month) - 1 &&
          parsed.getDate() === Number(day);

        if (!isRealDate || parsed > new Date()) {
          nextErrors.dateOfBirth = 'Enter a valid date that is not in the future.';
        }
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const profile: UserProfile = {
      name: trimmedName,
      dateOfBirth,
      gender,
    };

    try {
      setLoading(true);
      setErrors({});

      await saveProfile(profile);
      router.replace('/profile');
    } catch {
      const message = 'Could not save your profile. Please try again.';

      if (Platform.OS === 'web') {
        window.alert(message);
      } else {
        Alert.alert('Something went wrong', message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>LET'S GET STARTED</Text>

          <Text style={styles.title}>Tell us about yourself.</Text>

          <Text style={styles.subtitle}>
            A few details to personalize your experience.
          </Text>
        </View>

        <View style={styles.form}>
          <AppTextInput
            label="YOUR NAME"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            error={errors.name}
          />

          <DateOfBirthInput
            value={dateOfBirth}
            onChange={setDateOfBirth}
            error={errors.dateOfBirth}
          />

          <GenderSelector
            value={gender}
            onChange={setGender}
          />
        </View>

        <View style={styles.footer}>
          <AppButton
            title="Continue"
            onPress={handleContinue}
            loading={loading}
          />

          <Text style={styles.footerText}>
            Your profile stays on this device for now.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 36,
  },
  eyebrow: {
    color: '#3478F6',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  title: {
    color: '#111111',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: '#777777',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  form: {
    gap: 28,
  },
  footer: {
    marginTop: 40,
    gap: 16,
  },
  footerText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },
});