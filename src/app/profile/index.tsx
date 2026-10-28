import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import ProfileAvatar from '../../components/profile/ProfileAvatar';
import ProfileCompletionCard from '../../components/profile/ProfileCompletionCard';
import ProfileSectionCard from '../../components/profile/ProfileSectionCard';

import { getProfile } from '../../services/profileStorage';
import type { UserProfile } from '../../types/profile';

function calculateAge(dateOfBirth: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth);

  if (!match) return null;

  const [, yearText, monthText, dayText] = match;

  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  const birthDate = new Date(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day ||
    birthDate > new Date()
  ) {
    return null;
  }

  const today = new Date();

  let age = today.getFullYear() - year;

  const birthdayHasNotOccurred =
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day);

  if (birthdayHasNotOccurred) {
    age--;
  }

  return age;
}

export default function ProfileScreen() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const savedProfile = await getProfile();

      if (!savedProfile) {
        router.replace('/');
        return;
      }

      setProfile(savedProfile);
    } catch {
      const message = 'Unable to load your profile. Please try again.';

      if (Platform.OS === 'web') {
        window.alert(message);
      } else {
        Alert.alert('Error', message);
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      void loadProfile();
    }, [loadProfile]),
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3478F6" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.errorText}>
          Could not load your profile.
        </Text>

        <Pressable onPress={() => void loadProfile()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const age = calculateAge(profile.dateOfBirth);

  const sections = [
    {
      title: 'Physical Details',
      description: 'Height, weight and other details',
      icon: '⚖️',
      route: '/sections/physical' as const,
    },
    {
      title: 'Education',
      description: 'School, college and qualifications',
      icon: '🎓',
      route: '/sections/education' as const,
    },
    {
      title: 'Work & Career',
      description: 'Jobs, skills and experience',
      icon: '💼',
      route: '/sections/career' as const,
    },
    {
      title: 'Personal Life',
      description: 'Relationships, interests and important dates',
      icon: '💜',
      route: '/sections/personal-life' as const,
    },
    {
      title: 'Family',
      description: 'Family members and relationships',
      icon: '🏡',
      route: '/sections/family' as const,
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <Text style={styles.brand}>ME APP</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={() => {
            if (Platform.OS === 'web') {
              window.alert('Settings will be added later.');
            } else {
              Alert.alert('Settings', 'Settings will be added later.');
            }
          }}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙</Text>
        </Pressable>
      </View>

      <View style={styles.profileHeader}>
        <ProfileAvatar
          name={profile.name}
          imageUri={profile.profilePictureUri}
          onPress={() => router.push('/profile/photo')}
          size={112}
        />

        <Text style={styles.name}>{profile.name}</Text>

        <Text style={styles.meta}>
          {age === null ? 'Your personal space' : `${age} years old`}
        </Text>

        <Text style={styles.welcome}>
          Your life, all in one place.
        </Text>
      </View>

      <ProfileCompletionCard
        progress={16.67}
        onPress={() => router.push('/profile/complete')}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>MY INFORMATION</Text>

        <Text style={styles.sectionSubtitle}>
          Add details whenever you want.
        </Text>
      </View>

      <View style={styles.sectionList}>
        {sections.map((section) => (
          <ProfileSectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            icon={section.icon}
            onPress={() => router.push(section.route)}
          />
        ))}
      </View>

      <Text style={styles.footer}>
        Your profile. Your pace. Your space.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 28,
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: {
    color: '#555555',
    fontSize: 15,
  },
  retryText: {
    color: '#3478F6',
    fontWeight: '700',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#111111',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F4F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 21,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  name: {
    marginTop: 5,
    color: '#111111',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.7,
    textAlign: 'center',
  },
  meta: {
    color: '#555555',
    fontSize: 15,
  },
  welcome: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionHeader: {
    gap: 7,
    marginBottom: -12,
  },
  sectionTitle: {
    color: '#222222',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  sectionSubtitle: {
    color: '#888888',
    fontSize: 13,
  },
  sectionList: {
    gap: 12,
  },
  footer: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    marginTop: 2,
  },
});