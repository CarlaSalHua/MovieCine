import React, { useCallback } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Loading from "@/components/common/Loading/Loading";
import TextError from "@/components/common/TextError/TextError";
import MovieHorizontalList from "@/components/MovieHorizontalList/MovieHorizontalList";

import { MoviesStackParamList } from "@/types";
import { MoviesSectionKey } from "./MoviesSection.config";
import { useMoviesSection } from "@/hooks/useMoviesSection";
import { SectionHeader } from "../common/SectionHeader/SectionHeader";
import { useSaveMovies } from "@/hooks/useSaveMovies";

interface Props {
  section: MoviesSectionKey;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoviesSection: React.FC<Props> = ({ section, containerStyle }) => {
  const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamList>>();
  const { toggleSave } = useSaveMovies();

  const {
    title,
    loadingText,
    moviesData,
    error,
    isInitialLoading,
    isLoadingMore,
    loadMore,
  } = useMoviesSection(section);

  const handleOpenDetail = useCallback(
    (movieId: number) => navigation.navigate("MovieDetail", { movieId }),
    [navigation]
  );

  if (isInitialLoading) return <Loading loadingText={loadingText} />;
  if (error) return <TextError textError={error} />;

  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader title={title} />
      <MovieHorizontalList
        data={moviesData}
        onEndReached={loadMore}
        onPressItem={handleOpenDetail}
        onPressSave={toggleSave}
        loadingMore={isLoadingMore}
      />
    </View>
  );
};

export default React.memo(MoviesSection);

const styles = StyleSheet.create({
  container: { marginTop: 0 },
});
