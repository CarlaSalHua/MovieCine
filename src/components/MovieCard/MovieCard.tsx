import { Pressable, Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from './MovieCard.styles';
import movieImage from '@/assets/images/index';

interface MovieCardProps {
  movie: any;
  onPress?: () => void;
}

const MovieCard = ({ movie, onPress }: MovieCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card, 
        pressed && styles.cardPressed
      ]}
      key={movie.id}
      onPress={onPress}
    >
      <Image
        source={{ uri: movie.image ?? movieImage }}
        style={styles.poster}
      />
      <View style={styles.meta}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        <Text style={styles.rating}>★ {movie.rating}</Text>
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
};

export default MovieCard;
