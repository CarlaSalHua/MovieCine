export type MoviesStackParamList = {
  MoviesHome: undefined;
  MovieDetail: { movieId: number };
};

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface UpcomingMoviesResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SizeImages = "w300" | "w500" | "w780" | "w1280" | "original";

// Movie Detail Types:
export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  type: string;
  site: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
}

export interface Videos {
  results: Video[];
}

export interface MovieDetails extends Movie {
  runtime?: number;
  genres?: Genre[];
  videos?: Videos;
  credits?: Credits;
}