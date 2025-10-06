import React from 'react';
import { View } from 'react-native';
import { styles } from './MovieList.styles';
import MoviesSection from '../MoviesSection/MoviesSection';
import { MoviesSectionKey } from '../MoviesSection/MoviesSection.config';

const sections: Array<{ key: MoviesSectionKey; containerStyle?: object }> = [
  { key: 'popular' },
  { key: 'upcoming', containerStyle: styles.sectionSpacing },
];

const MovieList = () => {
  return (
    <View style={styles.container}>
      {sections.map(({ key, containerStyle }) => (
        <MoviesSection
          key={key}
          section={key}
          containerStyle={containerStyle}
        />
      ))}
    </View>
  );
};

export default MovieList;
