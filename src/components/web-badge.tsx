import { StyleSheet, Text, View } from 'react-native';

export function WebBadge() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Powered by Expo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F1F1F4',
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
});
