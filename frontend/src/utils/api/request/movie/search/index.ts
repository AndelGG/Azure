import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { MovieResponse } from '@/generated';
import { apiAndel } from '../../../instance';

export interface SearchMovieParams {
  search: string;
}

export type SearchMovieRequestConfig = FetchesRequestConfig<SearchMovieParams>;

export const searchMovie = ({ config, params }: SearchMovieRequestConfig) =>
  apiAndel.get<MovieResponse>(`/movies/short-search/`, {
    ...config,
    params: { ...params, ...config?.params },
  });
