import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileAvatarProps {
  name: string;
  imageUri?: string | null;
  onPress?: () => void;
  size?: number;
}

export default function ProfileAvatar({
  name,
  imageUri,
  onPress,
  size = 112,
}: ProfileAvatarProps) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('') || '?';

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Profile picture"
        onPress={onPress}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
          />
        ) : (
          <Text style={[styles.initials, { fontSize: size * 0.32 }]}>
            {initials}
          </Text>
        )}
      </Pressable>

      <Text style={styles.caption}>
        {imageUri ? 'Your photo' : 'Add a profile photo'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    backgroundColor: '#E8F0FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    color: '#245CC5',
    fontWeight: '800',
  },
  caption: {
    color: '#777777',
    fontSize: 13,
  },
});