import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TextError = ({ textError }: { textError?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textError ? textError : 'Error'}</Text>
    </View>
  );
};

export default TextError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
  },
});
