import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../types/profile';

const PROFILE_KEY = '@meapp/user-profile';

export async function saveProfile(
  profile: UserProfile,
): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function getProfile(): Promise<UserProfile | null> {
  const stored = await AsyncStorage.getItem(PROFILE_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    return null;
  }
}