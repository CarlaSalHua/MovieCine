import { Pressable, Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from './SavedMovie.styles';
import { MovieDetails } from '@/types';
import { moviesApi } from '@/services/api/moviesApi';

interface SavedMovieProps {
    movie: MovieDetails;
    onPress: () => void;
}

const SavedMovie = ({ movie, onPress } : SavedMovieProps) => {
    const poster = moviesApi.imageUrl(movie.poster_path);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.placeholder]} />
      )}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        <Text numberOfLines={2} style={styles.overview}>
          {movie.overview}
        </Text>
        <Text style={styles.rating}>
          ★ {movie.vote_average?.toFixed(1) ?? '–'}
        </Text>
      </View>
    </Pressable>
  );
};

export default SavedMovie;
