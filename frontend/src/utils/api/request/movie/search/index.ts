import type { FetchesRequestConfig } from '@siberiacancode/fetches';
import type { MovieResponse } from '@/generated';
import { apiAndel } from '../../../instance';

export interface SearchMovieParams {
  query: string;
}

export type SearchMovieRequestConfig = FetchesRequestConfig<SearchMovieParams>;

export const searchMovie = ({ config, params }: SearchMovieRequestConfig) =>
  apiAndel.post<MovieResponse>(`/search`, params, config);
