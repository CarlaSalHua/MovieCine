import { Text, ScrollView, Pressable, View } from 'react-native';
import React from 'react';
import MovieList from '@/components/MovieList/MovieList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MoviesScreen.styles';

const MoviesScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView>
        <View style={styles.headerContainer} >
          <Text style={styles.header}>Movies</Text>
          <Pressable style={styles.iconContainer}>
            <Text style={styles.icon}>☰</Text>
          </Pressable>
        </View>
        <MovieList />
      </SafeAreaView>
    </ScrollView>
  );
};

export default MoviesScreen;
