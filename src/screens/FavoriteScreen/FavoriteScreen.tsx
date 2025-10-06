import { FlatList, StatusBar, Text } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedMovie from '@/components/SavedMovie/SavedMovie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoviesStackParamList } from '@/types';
import { styles } from './FavoriteScreen.styles';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadSaved } from '@/features/saved/savedSlice';

const FavoriteScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoviesStackParamList>>();
  const dispatch = useAppDispatch();
  const { items : saved } = useAppSelector(state => state.saved);

  useEffect(() => {
    dispatch(loadSaved());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={Object.values(saved)}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <SavedMovie
            movie={item}
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No saved movies yet.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;
