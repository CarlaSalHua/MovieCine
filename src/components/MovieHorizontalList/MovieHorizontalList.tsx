import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Movie } from "@/types";
import MovieCard from "@/components/MovieCard/MovieCard";
import Loading from "../common/Loading/Loading";

type MovieHorizontalListProps = {
  data: Movie[];
  onEndReached: () => void;
  onPressItem: (movieId: number) => void;
  onPressSave: (movieId: number) => void;
  isSaved?: (movieId: number) => boolean;
  loadingMore?: boolean;
};

const MovieHorizontalList: React.FC<MovieHorizontalListProps> = ({
  data,
  onEndReached,
  onPressItem,
  onPressSave,
  isSaved,
  loadingMore,
}) => {
  const getIsSaved = useCallback(
    (movieId: number) => (isSaved ? isSaved(movieId) : false),
    [isSaved]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          onPress={() => onPressItem(item.id)}
          onPressSave={() => onPressSave(item.id)}
          isSaved={getIsSaved(item.id)}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      nestedScrollEnabled
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      initialNumToRender={10}
      maxToRenderPerBatch={12}
      style={styles.list}
      ListFooterComponent={loadingMore ? <Loading /> : null}
    />
  );
};

export default React.memo(MovieHorizontalList);

const styles = StyleSheet.create({
  list: {
    paddingLeft: 16,
  },
});
