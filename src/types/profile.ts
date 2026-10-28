export type Gender =
  | 'male'
  | 'female'
  | 'other'
  | 'prefer_not_to_say';

export interface UserProfile {
  name: string;
  dateOfBirth: string;
  gender: Gender | null;
}