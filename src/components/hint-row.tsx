import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HintRowProps = {
  title: string;
  hint: ReactNode;
};

export function HintRow({ title, hint }: HintRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.content}>
        {hint}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111111',
  },
  content: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
});
