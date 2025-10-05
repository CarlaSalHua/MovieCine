import {
  PopularMoviesResponse,
  SizeImages,
  UpcomingMoviesResponse,
} from '@/types';
import API from '../config/axios';
import { TMDB_IMAGE_BASE } from '@env';

export const moviesApi = {
  popular: async (page: number = 1) => {
    const { data } = await API.get<PopularMoviesResponse>(
      `/movie/popular?page=${page}`,
    );
    return data;
  },
  upcoming: async (page: number = 1) => {
    const { data } = await API.get<UpcomingMoviesResponse>(
      `/movie/upcoming?page=${page}`,
    );
    return data;
  },
  imageUrl: (path: string | null, size: SizeImages = 'w500') => {
    return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null;
  },
};
