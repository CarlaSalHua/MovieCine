import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const SectionHeader = React.memo(({ title }: { title: string }) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>{title}</Text>
  </View>
));

const styles = StyleSheet.create({
  wrapper: { 
    marginTop: 0, 
    paddingHorizontal: 16, 
    marginBottom: 8 
  },
  title: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '700' 
  },
});
