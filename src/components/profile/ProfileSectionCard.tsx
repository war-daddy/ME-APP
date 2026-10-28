import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileSectionCardProps {
  title: string;
  description: string;
  icon: string;
  completed?: boolean;
  onPress: () => void;
}

export default function ProfileSectionCard({
  title,
  description,
  icon,
  completed = false,
  onPress,
}: ProfileSectionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.trailing}>
        <Text style={completed ? styles.completed : styles.status}>
          {completed ? '✓' : 'Add'}
        </Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 82,
    padding: 15,
    borderWidth: 1,
    borderColor: '#EEEEF2',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F3F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },
  description: {
    fontSize: 12,
    color: '#777777',
    lineHeight: 17,
  },
  trailing: {
    alignItems: 'center',
    gap: 3,
  },
  status: {
    color: '#3478F6',
    fontSize: 11,
    fontWeight: '700',
  },
  completed: {
    color: '#18864B',
    fontSize: 17,
    fontWeight: '800',
  },
  arrow: {
    color: '#999999',
    fontSize: 22,
  },
  pressed: {
    opacity: 0.7,
  },
});