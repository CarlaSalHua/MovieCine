import { Text, ScrollView, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import MovieList from '@/components/MovieList/MovieList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MoviesScreen.styles';
import MovieFilters from '@/components/MovieFilters/MovieFilters';

const MoviesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
      >
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Movies</Text>
            <Pressable onPress={toggleModal} style={styles.iconContainer}>
              <Text style={styles.icon}>☰</Text>
            </Pressable>
          </View>
          <MovieList />
        </SafeAreaView>
      </ScrollView>
      <MovieFilters isModalVisible={isModalVisible} toggleModal={toggleModal} />
    </>
  );
};

export default MoviesScreen;
