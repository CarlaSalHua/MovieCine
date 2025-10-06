import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { styles } from './MovieDetailScreen.styles';
import { MovieDetails } from '@/types';
import { moviesApi } from '@/services/api/moviesApi';
import movieImage from '@/assets/images/index';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSaveMovies } from '@/hooks/useSaveMovies';

interface MovieDetail {
  route: { params: { movieId: number } };
}

const MovieDetailScreen = ({ route }: MovieDetail) => {
  const navigation = useNavigation();
  const { toggleSave, savedItems } = useSaveMovies();
  const movieId = route.params.movieId;
  const [movie, setMovie] = React.useState<MovieDetails | null>(null);
  const backdrop = moviesApi.imageUrl(movie?.backdrop_path ?? null, 'w500');
  const genres = movie?.genres?.map(g => g.name).join(', ') ?? '';

  const trailerKey = movie?.videos?.results.find(
    v => v.site === 'YouTube' && v.type.toLowerCase().includes('trailer'),
  )?.key;

  const isSaved = useMemo(() => Boolean(savedItems[movieId]), [savedItems, movieId]);

  useEffect(() => {
    const getDetails = async () => {
      const data = await moviesApi.details(movieId);
      setMovie(data);
    };

    getDetails();
  }, [movieId]);

  const handleToggleSave = useCallback(() => {
    toggleSave(movieId, movie ?? undefined);
  }, [movieId, movie, toggleSave]);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}
        >
          <Text style={styles.backText}>{'< Back'}</Text>
        </TouchableOpacity>
        {backdrop ? (
          <Image
            source={backdrop ? { uri: backdrop } : movieImage}
            resizeMode="cover"
            style={styles.backdrop}
          />
        ) : null}
        <View style={styles.content}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.meta}>
            {(movie?.release_date || '').slice(0, 4)} ·{' '}
            {movie?.runtime ? `${movie.runtime}m` : '–'} · {genres}
          </Text>
          <View style={styles.actions}>
            <Pressable
              onPress={handleToggleSave}
              disabled={!movie}
              style={({ pressed }) => [
                styles.btn,
                styles.save,
                isSaved && styles.saveActive,
                pressed && styles.btnPressed,
                !movie && styles.btnDisabled,
              ]}
            >
              <Text style={styles.btnText}>
                {isSaved ? 'Saved to Watchlist' : '+ Save to Watchlist'}
              </Text>
            </Pressable>
            {trailerKey ? (
              <Pressable
                onPress={() =>
                  Linking.openURL(
                    `https://www.youtube.com/watch?v=${trailerKey}`,
                  )
                }
                style={({ pressed }) => [
                  styles.btn,
                  styles.trailer,
                  pressed && styles.btnPressed,
                ]}
              >
                <Text style={styles.btnText}>Play Trailer</Text>
              </Pressable>
            ) : null}
          </View>
          <Text style={styles.overview}>{movie?.overview}</Text>
        </View>
        {movie?.credits?.cast?.length ? (
          <View style={styles.castSection}>
            <Text style={styles.section}>Cast</Text>
            <FlatList
              data={movie.credits.cast}
              renderItem={({ item }) => (
                <View style={styles.cast}>
                  <View style={styles.avatar} />
                  <Text numberOfLines={1} style={styles.castName}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.castChar}>
                    {item.character}
                  </Text>
                </View>
              )}
              horizontal
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.listPadding}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default MovieDetailScreen;
