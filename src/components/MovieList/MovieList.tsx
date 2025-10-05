import {  View } from 'react-native';
import React from 'react';
import { styles } from './MovieList.styles';
import PopularMovies from './PopularMovies/PopularMovies';
import UpcomingMovies from './UpcomingMovies/UpcomingMovies';

const MovieList = () => {
  return (
    <View style={styles.container}>
      {/* Popular Movies */}
      <PopularMovies key={'popular'}/>

      {/* Upcoming Movies */}
      <UpcomingMovies key={'upcoming'} />
    </View>
  );
};

export default MovieList;
