import { Pressable, Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from './MovieCard.styles';
import movieImage from '@/assets/images/index';
import { Movie } from '@/types';
import { moviesApi } from '@/services/api/moviesApi';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard = React.memo(({ movie, onPress }: MovieCardProps) => {
  // calling the images api
  const poster = moviesApi.imageUrl(movie.poster_path) as string | undefined;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <Image
        source={movie.poster_path ? { uri: poster } : movieImage}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.meta}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        {
          movie.vote_average > 0 ? (
            <Text style={styles.rating}>★ {movie.vote_average}</Text>
          ) : null
        }
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.saveBtn,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.saveTxt}>+ Save</Text>
      </Pressable>
    </Pressable>
  );
});

export default MovieCard;
