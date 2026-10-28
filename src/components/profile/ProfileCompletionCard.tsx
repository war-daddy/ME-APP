import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileCompletionCardProps {
  progress: number;
  onPress: () => void;
}

export default function ProfileCompletionCard({
  progress,
  onPress,
}: ProfileCompletionCardProps) {
  const percentage = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Complete your profile</Text>
          <Text style={styles.subtitle}>
            Build your personal space, one detail at a time.
          </Text>
        </View>

        <Text style={styles.percentage}>{percentage}%</Text>
      </View>

      <View
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: percentage,
        }}
        style={styles.track}
      >
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>Complete Profile →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F3F6FF',
    borderRadius: 22,
    padding: 20,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111111',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#666666',
  },
  percentage: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3478F6',
  },
  track: {
    height: 7,
    borderRadius: 10,
    backgroundColor: '#DCE5FA',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#3478F6',
    borderRadius: 10,
  },
  button: {
    minHeight: 48,
    backgroundColor: '#3478F6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});