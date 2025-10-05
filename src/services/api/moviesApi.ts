import { PopularMoviesResponse, UpcomingMoviesResponse } from '@/types';
import API from '../config/axios';

export const moviesApi = {
  popular: async (page: number = 1) => {
    const { data } = await API.get<PopularMoviesResponse>(`/movie/popular?page=${page}`);
    console.log(data);
    return data;
  },
  upcoming: async (page: number = 1) => {
    const { data } = await API.get<UpcomingMoviesResponse>(`/movie/upcoming?page=${page}`);
    return data;
  },
};
