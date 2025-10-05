import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loading = ({ loadingText }: { loadingText?: string }) => {
  return (
    <View style={styles.containerLoadind}>
      <ActivityIndicator size="large" color="#E50914" />
      <Text style={styles.text}>
        {loadingText ? loadingText : 'Loading...'}
      </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  containerLoadind: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: {
    color: '#fff',
    marginTop: 8
  }
});
