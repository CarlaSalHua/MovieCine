import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { styles } from './MovieFilters.styles';
import Slider from '@react-native-community/slider';

type FilterState = {
  country: string;
  language: string;
  rating: [number, number];
  yearFrom: string;
  yearTo: string;
  genres: number[];
};

const MovieFilters = ({ isModalVisible, toggleModal } : any) => {
  const [filters, setFilters] = useState<FilterState>({
    country: '',
    language: '',
    rating: [1, 10],
    yearFrom: '',
    yearTo: '',
    genres: [],
  });

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleGenre = (id: number) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(id)
        ? prev.genres.filter(x => x !== id)
        : [...prev.genres, id],
    }));
  };

  const clearAll = () => {
    setFilters({
      country: '',
      language: '',
      rating: [1, 10],
      yearFrom: '',
      yearTo: '',
      genres: [],
    });

    toggleModal();
  };

  const applyFilters = async () => {
    toggleModal();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      useNativeDriver
      coverScreen
      style={styles.container}
    >
      <View style={styles.fullscreen}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Filters</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
              <Text style={styles.icon}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Country */}
          <Text style={styles.label}>Country</Text>
          <TextInput
            placeholder="e.g. US"
            placeholderTextColor="#aaa"
            value={filters.country}
            onChangeText={val => updateFilter('country', val)}
            style={styles.input}
          />

          {/* Language */}
          <Text style={styles.label}>Language</Text>
          <TextInput
            placeholder="e.g. en"
            placeholderTextColor="#aaa"
            value={filters.language}
            onChangeText={val => updateFilter('language', val)}
            style={styles.input}
          />

          {/* Ratings */}
          <Text style={styles.label}>Ratings</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={filters.rating[1]}
            onValueChange={val => updateFilter('rating', [1, val])}
          />
          <Text style={styles.value}>
            {filters.rating[0]} - {filters.rating[1]}
          </Text>

          {/* Year range */}
          <Text style={styles.label}>Release Year</Text>
          <View style={styles.year}>
            <TextInput
              placeholder="From"
              placeholderTextColor="#aaa"
              value={filters.yearFrom}
              onChangeText={val => updateFilter('yearFrom', val)}
              style={[styles.input, styles.position]}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="To"
              placeholderTextColor="#aaa"
              value={filters.yearTo}
              onChangeText={val => updateFilter('yearTo', val)}
              style={[styles.input, styles.position]}
              keyboardType="numeric"
            />
          </View>

          {/* Genres */}
          <Text style={styles.label}>Genres</Text>
          <View style={styles.chips}>
            {[
              { id: 28, name: 'Action' },
              { id: 35, name: 'Comedy' },
              { id: 18, name: 'Drama' },
              { id: 27, name: 'Horror' },
            ].map(g => (
              <Pressable
                key={g.id}
                onPress={() => toggleGenre(g.id)}
                style={[
                  styles.chip,
                  filters.genres.includes(g.id) && styles.activeChip,
                ]}
              >
                <Text style={styles.chipText}>{g.name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.actions}>
            <Pressable onPress={clearAll} style={styles.clear}>
              <Text style={styles.textWhite}>Clear All</Text>
            </Pressable>
            <Pressable onPress={applyFilters} style={styles.apply}>
              <Text style={styles.textWhite}>Apply Filters</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default MovieFilters;
